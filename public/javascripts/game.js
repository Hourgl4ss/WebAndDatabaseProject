var main = function(){
    gameOne = new game(1, true);
    initialiseButtonActions(gameOne);
}

//Basic constructor for the game object
var game = function(gameId, allowDupes){
    this.cursorState = "default";
    this.guessingRowNumber = 9;
    this.filledCircleCounter = 0;
    this.id = gameId;
    this.duplicatesAllowed = allowDupes;
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
            $('body').css('cursor', 'url(../images/' +this.id+ '.png), auto');
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

                if($(this).attr("src") === "../images/emptyCircle.png") gameInstance.filledCircleCounter += 1;
                $(this).attr("src", "../images/" +gameInstance.cursorState+ ".png");
            } else {

                if(!($(this).attr("src") === "../images/emptyCircle.png")) gameInstance.filledCircleCounter -= 1;
                $(this).attr("src", "../images/emptyCircle.png");
            }
        } else {

            console.log("else works for animate");
            //@TODO Row glows up red and the currently active row glows white
            $("#r"+gameInstance.guessingRowNumber).animate({
                backgroundColor : "rgb(173, 173, 173);"
            }, 7000);

        }
    });

    //On submitting using the submit button the callback executes and does a few things further comments below
    $("#submitButton").click(function(){

        //Check if all four slots in this row are filled and if duplicates are allowed and present
        if(gameInstance.duplicatesAllowed && (gameInstance.filledCircleCounter >= 4)){
            gameInstance.guessingRowNumber -= 1;
            gameInstance.filledCircleCounter = 0;

            if(gameInstance.isGameFinished()) endGameInstance();

            //update the active row indication
            gameInstance.showActiveGuessField(gameInstance.guessingRowNumber);

        } else if(false){

        } else {

        }
    });
}

$(document).ready(main);