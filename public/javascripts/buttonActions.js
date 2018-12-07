/**
 * Initialises all the button onclick eventlisteners
 */
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

    /**
     *  On click of type button, change its color to cursor color
     */
    var buttonChangesColor = function(){
        if($(this).parent().attr("id") === "r"+gameInstance.guessingRowNumber || $(this).parent().attr("id") === "codeRow"){

            if(!(gameInstance.cursorState === "default")){

                if($(this).attr("src") === "./images/emptyCircle.png") gameInstance.filledCircleCounter += 1;
                $(this).attr("src", "./images/" +gameInstance.cursorState+ ".png");
            } else {

                if(!($(this).attr("src") === "./images/emptyCircle.png")) gameInstance.filledCircleCounter -= 1;
                $(this).attr("src", "./images/emptyCircle.png");
            }
        } else {
            //Check if were inserting a new mastercode
            //@TODO Row glows up red and the currently active row glows white
            gameInstance.flickerActiveGuessRow();
        }
    }
    
    
    $(".guessButton").click(buttonChangesColor);
    
    $("#codeRow").children("input").each(function(){
        $(this).prop("disabled", true);
        $(this).click(buttonChangesColor);
    });

    

    //On submitting using the submit button the callback executes and does a few things further comments below
    $("#submitButton").click(function(){


        if(gameInstance.playerType === "CODEMAKER" && !gameInstance.codeSetAlready && (gameInstance.filledCircleCounter >= 4)){
            
            let tempColorsContainer = new Array();

            $("#r"+gameInstance.guessingRowNumber).children("input").each(function(){
                tempColorsContainer.push($(this).attr("src"));
            });

            //@TODO make this work ! ^^
            socketConnection.send(JSON.stringify(tempColorsContainer));

            gameInstance.codeSetAlready = true;
        } else if(gameInstance.playerType === "GUESSER" && !gameInstance.codeSetAlready && (gameInstance.filledCircleCounter >= 4)){
            

        } else if(gameInstance.codeSetAlready){
            window.alert("You can only submit one code");

        } else if(!(gameInstance.filledCircleCounter >= 4)){
            window.alert("Please fill in all four circles for the code");

        } 
    });
}
