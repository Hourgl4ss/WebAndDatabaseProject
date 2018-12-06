var localGame = function(){
    this.cursorState = "default";
    this.filledCircleCounter = 0;
    this.guessingRowNumber = 9;
    
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


    // //update the active row indication
    // this.showActiveGuessField(this.guessingRowNumber);