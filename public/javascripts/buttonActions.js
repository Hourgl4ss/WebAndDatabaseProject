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
        let thisImageSrc = $(this).attr("src");

        if($(this).parent().attr("id") === "r"+gameInstance.guessingRowNumber || $(this).parent().attr("id") === "codeRow"){

            if(!(gameInstance.cursorState === "default")){

                if(thisImageSrc === "./images/emptyCircle.png" || thisImageSrc === "./images/emptyCircleQuestionmark.png") gameInstance.filledCircleCounter += 1;
                $(this).attr("src", "./images/" +gameInstance.cursorState+ ".png");
            } else {

                if(!(thisImageSrc === "./images/emptyCircle.png") && !(thisImageSrc === "./images/emptyCircleQuestionmark.png")) gameInstance.filledCircleCounter -= 1;
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

        //Correct path for codemaker to submit the mastercode
        if(gameInstance.playerType === "CODEMAKER" && !gameInstance.codeSetAlready && (gameInstance.filledCircleCounter >= 4)){
            
            let tempColorsContainer = new Array();

            $("#codeRow").children("input").each(function(){
                tempColorsContainer.push($(this).attr("src"));
            });

            let x = JSON.stringify();
            
            //@TODO make this work ! ^^
            socketConnection.send(JSON.stringify(x));

            gameInstance.codeSetAlready = true;
        
        //Correct path for the guesser to submit a guess
        } else if(gameInstance.playerType === "GUESSER" && gameInstance.codeSetAlready && (gameInstance.filledCircleCounter >= 4)){
            

        //Guesser guessed too early
        } else if(gameInstance.playerType === "GUESSER" && !gameInstance.codeSetAlready){
            window.alert("Please wait for the codemaker to make a move");

        //Codemaker tried to submit another code
        } else if(gameInstance.playerType === "CODEMAKER" && gameInstance.codeSetAlready){
            window.alert("You can only submit one code");

        //Either the codemaker or guesser didn't fill all four circles before submitting
        } else if(!(gameInstance.filledCircleCounter >= 4)){
            window.alert("Please fill in all four circles for the code");

        } 
    });
}
