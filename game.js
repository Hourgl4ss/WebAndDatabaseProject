//Basic constructor for the game object
var game = function(gameId, allowDupes){
    this.id = gameId;
    this.duplicatesAllowed = allowDupes;
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
}

game.prototype.addPlayer = function(playerSocketConnection, playerWaiting){
    if(playerWaiting){
        this.player2 = playerSocketConnection; 
    } else {
        this.player1 = playerSocketConnection;
    }
}

//Asks a code to one of the players playing
game.prototype.askCode = function(player){
    //@TODO inplement the function
}

//Sets the code to be guessed for the game
game.prototype.setCode = function(inputCode){
    this.masterCode = inputCode;
}

//checks if this round's guess was the correct one
game.prototype.correctGuess = function(){
    let tempCodeArray = new Array();

    $("#r"+this.guessingRowNumber).children("input").each(function(){
        tempSourceContainer.push($(this).attr("src"));
    });

    return this.masterCode === tempCodeArray;
}

/**
 * Moves on to the next guessing round
 */
game.prototype.nextRound = function(){
    //update game variables and give visual queues
    this.guessingRowNumber -= 1;

    if(this.isGameFinished()) this.endGameInstance();

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
