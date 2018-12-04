var main = function(){
    gameOne = new game(1, true);
    initialiseButtonActions(gameOne);
    
}

var game = function(gameId, allowDupes){
    this.cursorState = "default";
    this.guessingRowNumber = 9;
    this.filledCircleCounter = 0;
    this.id = gameId;
    this.duplicatesAllowed = allowDupes;
}

var initialiseButtonActions = function(gameInstance){

    //On color selector button press, change cursor type to image corresponding to the color picked
    $(".pickerButton").click(function(){
        if(!(this.id === "nocolor")){ 
            $('body').css('cursor', 'url(../images/' +this.id+ '.png), auto');
            gameInstance.cursorState = this.id;
        } else{
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
            } else{
                if(!($(this).attr("src") === "../images/emptyCircle.png")) gameInstance.filledCircleCounter -= 1;
                $(this).attr("src", "../images/emptyCircle.png");
            }
        } else {
            //@TODO: Row glows up red and the currently active row glows white
        }
    });

    //On submitting using the submit button the callback executes and does a few things further comments below
    $(".submitButton").click(function(){
        //Check if all four slots in this row are filled and if duplicates are allowed and present
        if(gameInstance.duplicatesAllowed && gameInstance.filledCircleCounter>3){
            gameInstance.guessingRowNumber -= 1;
            gameInstance.filledCircleCounter = 0;
        } else if(false){

        } else {

        }
    });
}

$(document).ready(main);