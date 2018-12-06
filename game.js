//Basic constructor for the game object
var game = function(gameId, allowDupes){
    this.id = gameId;
    this.duplicatesAllowed = allowDupes;
    this.guessingRowNumber = 9;

    this.player1 = null;
    this.player2 = null;

    this.masterCode = new Array();
    
    //this.showActiveGuessField(9);
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

module.exports = game;
