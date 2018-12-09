var socketConnection = new WebSocket("ws://localhost:3000");

var localGame1 = new localGame();
initialiseButtonActions(localGame1);
localGame1.showActiveGuessField();

socketConnection.onopen = function(event){
}

//Executes on message received from websocket connection
socketConnection.onmessage = function(event){

    //Parse data to be used
    let receivedMessage = JSON.parse(event.data);
    console.log(receivedMessage);

    //If codemaker, make code xd
    if(receivedMessage.messageType === "CODEMAKER") {
        localGame1.setModeCodemaker();
        localGame1.askCode();
        localGame1.setStatusMessage("Waiting for other player to connect");
    }

    //If guesser, make ready to guess and wait for codemaker to submit
    if(receivedMessage.messageType === "GUESSER"){
        localGame1.setModeGuesser();
        localGame1.setStatusMessage("Please wait for the codemaker to submit their code")
    }

    //
    if(receivedMessage.messageType === ""){

    }

    //If an status update message is received
    if(receivedMessage.messageType === "STATUS"){
        
        if(receivedMessage.statusUpdate === "CODE_SET"){
            localGame1.codeSetAlready = true;

            //Alert the guessing player
            if(localGame1.playerType === "GUESSER") localGame1.setStatusMessage("The codemaker submitted their code, start guessing now!");

            //Disables altering of the mastercode once it's been set on the server
            if(localGame1.playerType === "CODEMAKER"){
                localGame1.setStatusMessage("Code was set, waiting for codebreaker to make a move")
                $("#codeRow").children("input").each(function(){
                    $(this).prop("disabled", true);
                });
            };
        }

        if(receivedMessage.statusUpdate === "PLAYER_JOINED"){
            localGame1.setStatusMessage("Player connected, waiting for moves");
        }

        else if(receivedMessage.statusUpdate === "GUESS_CORRECT"){

            //Update the view for the codemaker
            if(localGame1.playerType === "CODEMAKER") localGame1.updateView(receivedMessage.guessedArray);
        }

        else if(receivedMessage.statusUpdate === "GUESS_INCORRECT"){

            //Update the view for the codemaker
            if(localGame1.playerType === "CODEMAKER") localGame1.updateView(receivedMessage.guessedArray);

            //Update the amount of right guesses and right in the right place guesses for both players
            localGame1.updateSmallCircles(receivedMessage.rightGuesses, receivedMessage.rightGuessRightPlace);

            //@TODO: implement showing how many were right and how many were right in the right place
            localGame1.nextRound();
        }

        else if(receivedMessage.statusUpdate === "PLAYER_DISCONNECT"){
            localGame1.setStatusMessage("The other player disconnected");
            localGame1.stopGame();
        }

        else if(receivedMessage.statusUpdate === "GAME_END"){
            localGame1.stopGame();
        }
    }

    //Set up all the error messages tht the server could send
    if(receivedMessage.messageType === "ERROR"){
        //@TODO finish this expression

        if(receivedMessage.errorType === "BAD_MESSAGE"){
            localGame1.setStatusMessage("Message sent to server was undecipherable, please try again");
        }

        if(receivedMessage.errorType === "BAD_SUBMIT_NOT_ENOUGH"){
            localGame1.setStatusMessage("Please fill in all four circles for the code");
        }

        if(receivedMessage.errorType === "BAD_SUBMIT_OVERALL"){
            localGame1.setStatusMessage("Please try to make an accurate guess");
        }

        if(receivedMessage.errorType === "SUBMIT_EARLY"){
            localGame1.setStatusMessage("Please wait for the codemaker to make a move");
        }

        if(receivedMessage.errorType === "ALREADY_SUBMITTED"){
            localGame1.setStatusMessage("You can only enter one master code");
        }

        localGame1.codeSetAlready = false;
    }


};






