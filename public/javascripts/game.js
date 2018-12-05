var main = function(){
    gameOne = new game(1, false);

    initialiseButtonActions(gameOne);
}

//Basic constructor for the game object
var game = function(gameId, allowDupes){
    this.cursorState = "default";
    this.guessingRowNumber = 9;
    this.filledCircleCounter = 0;
    this.id = gameId;
    this.duplicatesAllowed = allowDupes;

    this.masterCode = new Array();

    this.showActiveGuessField(9);
}

//Returns true if the game is finished
game.prototype.isGameFinished = function(){
    return this.guessingRowNumber <= 0;
}

//Ends the game and returns players to the splash screen
game.prototype.endGameInstance = function(){
    //@TODO end the game on this function call
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

//Animate the active row to indicate something needs attention
game.prototype.flickerActiveGuessRow = function(){
    $("#r"+this.guessingRowNumber).animate({opacity: '0.6'}, 100);
    $("#r"+this.guessingRowNumber).animate({opacity: '1'}, 100);
    $("#r"+this.guessingRowNumber).animate({opacity: '0.6'}, 100);
    $("#r"+this.guessingRowNumber).animate({opacity: '1'}, 100);
}

//
game.prototype.nextRound = function(){
    //update game variables and give visual queues
    this.guessingRowNumber -= 1;
    this.filledCircleCounter = 0;

    if(this.isGameFinished()) this.endGameInstance();

    //update the active row indication
    this.showActiveGuessField(this.guessingRowNumber);
}

//Show/update the currently active row of guessing circles -- visual only
game.prototype.showActiveGuessField = function(row){
    $("#r"+(row+1)).css("background-color", "rgb(136, 136, 136)");
    $("#r"+row).css("background-color", "lightblue");
}

//Initialises all the button onclick eventlisteners
var initialiseButtonActions = function(gameInstance){

    //On color selector button press, change cursor type to image corresponding to the color picked
    $(".pickerButton").click(function(){
        //Update color if an actual color is selected
        if(!(this.id === "nocolor")){ 
            $('body').css('cursor', 'url(./images/' +this.id+ '.png), auto');
            gameInstance.cursorState = this.id;

        //Return to default if nocolor was selected
        } else {
            $('body').css('cursor', 'default');
            gameInstance.cursorState = "default";
        } 
    });

    //On click of guessing type button, change its color to cursor color
    $(".guessButton").click(function(){
        if($(this).parent().attr("id") === "r"+gameInstance.guessingRowNumber){

            if(!(gameInstance.cursorState === "default")){

                if($(this).attr("src") === "./images/emptyCircle.png") gameInstance.filledCircleCounter += 1;
                $(this).attr("src", "./images/" +gameInstance.cursorState+ ".png");
            } else {

                if(!($(this).attr("src") === "./images/emptyCircle.png")) gameInstance.filledCircleCounter -= 1;
                $(this).attr("src", "./images/emptyCircle.png");
            }
        } else {
            //@TODO Row glows up red and the currently active row glows white
            gameInstance.flickerActiveGuessRow();
        }
    });

    //On submitting using the submit button the callback executes and does a few things further comments below
    $("#submitButton").click(function(){

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
    });
}

$(document).ready(main);