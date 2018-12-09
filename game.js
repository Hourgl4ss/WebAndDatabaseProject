//Basic constructor for the game object
var game = function(gameId, allowDupes){
    this.id = gameId;
    this.duplicatesAllowed = allowDupes;

    //Guessng row starts at 9 (the bottom) and moves towards 1 (the top row)
    this.guessingRowNumber = 9;

    this.player1 = null;
    this.player2 = null;

    this.masterCode = new Array();
}

//Returns true if the game is finished
game.prototype.isGameFinished = function(){
    return this.guessingRowNumber <= 0;
}

//Ends the game and returns players to the splash screen
game.prototype.endGameInstance = function(){
    //@TODO end the game on this function call
    try{
        this.player1.send(JSON.stringify({messageType: "STATUS", statusUpdate: "GAME_END"}));
        this.player2.send(JSON.stringify({messageType: "STATUS", statusUpdate: "GAME_END"}));
    } catch(exception){
        console.log("\n----\t\nendGameInstance was called too early, players probably not connected yet\n----");
        console.log(exception)
    }


    
}

game.prototype.addPlayer = function(playerSocketConnection, playerWaiting){
    if(playerWaiting){
        this.player2 = playerSocketConnection; 
    } else {
        this.player1 = playerSocketConnection;
    }
}

//Sets the code to be guessed for the game
game.prototype.setCode = function(inputCode){
    this.masterCode = inputCode;
}

//checks if this round's guess was the correct one
game.prototype.correctGuess = function(guessedCodeArray){
    for(let i in guessedCodeArray){
        if(this.masterCode[i] != guessedCodeArray[i]) return false;
    }
    return true;
}

game.prototype.checkSubmission = function(submission){
    for(let i in submission){
        switch(submission[i]){
            case "./images/red.png": break;
            case "./images/green.png": break;
            case "./images/blue.png": break;
            case "./images/black.png": break;
            case "./images/yellow.png": break;
            case "./images/purple.png": break;
            case "./images/nocolors.png": return null;
            case "./images/emptyCircle.png": return null;
            case "./images/emptyCircleQuestionmark.png": return null;
            default: return null;
        }
    }
    return submission;
}

/**
 * Moves on to the next guessing round
 */
game.prototype.nextRound = function(){
    //update game variables and give visual queues
    this.guessingRowNumber -= 1;

    if(this.isGameFinished()) this.endGameInstance();

}

/**
 * Returns the amount of right guesses (plain) in returnedArray[0]
 * Returns the smount of right guessed in the right place in returnedArray[1]
 */
game.prototype.evaluateGuess = function(guessedArray){
    let returnedArray = [0, 0];

    for(let i in guessedArray){
        if(this.masterCode.includes(guessedArray[i])){
            if(this.masterCode[i] === guessedArray[i]){
                returnedArray[1] += 1;
            } else {
                returnedArray[0] += 1;
            }
        }
    }
    return returnedArray;
}


/** !!!!!!
 * This is code taken from the old game object on the client side app
 * it might be useful for later so i'll keep it here for now
 *  !!!!!!
 */
tempfuncstore = function(){
    //Check if all four slots in this row are filled and if duplicates are allowed and present
    if(gameInstance.duplicatesAllowed && (gameInstance.filledCircleCounter >= 4)){

        //Move on to the next round if game is not yet over
        if(!(gameInstance.correctGuess())) gameInstance.nextRound();

    } else if(gameInstance.filledCircleCounter >= 4){

        //for each child of the active guessing row, put their source in an array
        let tempSourceContainer = new Array();
        $("#r"+gameInstance.guessingRowNumber).children("input").each(function(){
            tempSourceContainer.push($(this).attr("src"));
        });

        //Check if the array contains duplicates
        let tempSourceSet = new Set(tempSourceContainer);
        if(tempSourceSet.size == tempSourceContainer.length){

            //If no duplicate exist, move on to the next guessing round
            gameInstance.nextRound();

        } else {

            //Duplicates exist but they are disabled, show this to the player
            gameInstance.flickerActiveGuessRow();
            window.alert("Duplicate colors are disabled!");
        }

    } else {
        
        //Something in the user's input is off, let them re-enter something
        gameInstance.flickerActiveGuessRow();
        window.alert("Please try to make an accurate guess!");
    }
}

module.exports = game;
