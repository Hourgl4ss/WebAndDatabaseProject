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

//Show and update the currently active row of guessing circles -- visual only
localGame.prototype.showActiveGuessField = function(row){
    $("#r"+(row+1)).css("background-color", "rgb(136, 136, 136)");
    $("#r"+row).css("background-color", "lightblue");
}

localGame.prototype.askCode = function(){
    window.alert("please enter the code in the top most row and hit submit!");
}

localGame.prototype.setModeGuesser = function(){
    $(".guessButton").each(function(){
        $(this).prop("disabled", false);
    });

    $("#codeRow").children("input").each(function(){
        $(this).prop("disabled", true);
    });

    this.playerType = "GUESSER";
}

localGame.prototype.setModeCodemaker = function(){
    $(".guessButton").each(function(){
        $(this).prop("disabled", true);
    });

    $("#codeRow").children("input").each(function(){
        $(this).prop("disabled", false);
    });

    this.playerType = "CODEMAKER";
}



    // //update the active row indication
    // this.showActiveGuessField(this.guessingRowNumber);