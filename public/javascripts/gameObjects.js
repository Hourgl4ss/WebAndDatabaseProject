var localGame = function(){
    this.cursorState = "default";
    this.filledCircleCounter = 0;
    this.guessingRowNumber = 9;
    this.codeSetAlready = false;

    this.playerType = "";
    
    this.showActiveGuessField(9);
}

//Animate the active row to indicate something needs attention
localGame.prototype.flickerActiveGuessRow = function(){
    $("#r"+this.guessingRowNumber).animate({opacity: '0.6'}, 100);
    $("#r"+this.guessingRowNumber).animate({opacity: '1'}, 100);
    $("#r"+this.guessingRowNumber).animate({opacity: '0.6'}, 100);
    $("#r"+this.guessingRowNumber).animate({opacity: '1'}, 100);
}

localGame.prototype.nextRound = function(){

    this.guessingRowNumber -= 1;
    this.showActiveGuessField(this.guessingRowNumber);

    if(this.playerType === "GUESSER") this.setStatusMessage("Incorrect for row " + (this.guessingRowNumber+1));

}

//Show and update the currently active row of guessing circles -- visual only
localGame.prototype.showActiveGuessField = function(row){
    $("#r"+(row+1)).css("background-color", "transparent");
    $("#r"+row).css("background-color", "lightblue");
}

localGame.prototype.askCode = function(){
    this.setStatusMessage("please enter the code in the top most row and hit submit!");
}

localGame.prototype.setModeGuesser = function(){
    $(".guessButton").each(function(){
        $(this).prop("disabled", false);
    });

    $("#codeRow").children("input").each(function(){
        $(this).prop("disabled", true);
    });

    this.playerType = "GUESSER";

    $("#youAre").append(" You are the " + this.playerType);
}

localGame.prototype.setModeCodemaker = function(){
    $(".guessButton").each(function(){
        $(this).prop("disabled", true);
    });

    $("#codeRow").children("input").each(function(){
        $(this).prop("disabled", false);
    });

    this.playerType = "CODEMAKER";

    $("#youAre").append(" You are the " + this.playerType);

    $("#r"+this.guessingRowNumber).css("background-color", "transparent");
    $("#codeRow").css("background-color", "lightblue");
}

localGame.prototype.stopGame = function(){
    if(this.guessingRowNumber < 0) this.setStatusMessage("The codemaker won!");

    this.setStatusMessage("Game ended");
}

localGame.prototype.updateView = function(guessedArray){
    let i = 0;
    $("#r"+this.guessingRowNumber).children("input").each(function(){
        $(this).prop("src", guessedArray[i]);
        i = i+1;
    });
}

localGame.prototype.updateSmallCircles = function(correct, correctPlace){
    let x = correct,
        y = correctPlace;

    $("#r"+this.guessingRowNumber).children(".rightGuesses").children("div").each(function(){
        $(this).css("background-color", "transparent");
        if(x > 0){
            $(this).css("background-color", "white");
            x--;
        } else if(y > 0){
            $(this).css("background-color", "black");
            y--;
        }
    });
}

localGame.prototype.setStatusMessage = function(message){
    if(typeof message === 'string') $("#statusMessage").append("<br/>----------<br/>" + message);

    //Keep it scrolled to the bottom ( @TODO how to do this with jquery? )
    document.getElementById("status").scrollTop = document.getElementById("status").scrollHeight

    //Visually notify
    $("#status").css("background-color", "white");
    setTimeout(function(){
        $("#status").css("background-color", "transparent");
    }, 500);
}