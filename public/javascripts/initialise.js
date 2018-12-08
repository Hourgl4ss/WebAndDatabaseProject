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

    //localGame1.playerType = receivedMessage.messageType;

    //If codemaker, make code xd
    if(receivedMessage.messageType === "CODEMAKER") {
        localGame1.setModeCodemaker();
        localGame1.askCode();
    }

    //If guesser, make ready to guess and wait for codemaker to submit
    if(receivedMessage.messageType === "GUESSER"){
        localGame1.setModeGuesser();
        window.alert("Please wait for the codemaker to submit their code")
    }

    if(receivedMessage.messageType === ""){

    }

    //If an status update message is received
    if(receivedMessage.messageType === "STATUS"){
        
        if(receivedMessage.statusUpdate === "CODE_SET"){
            localGame1.codeSetAlready = true;

            //Alert the guessing player
            if(localGame1.playerType === "GUESSER") window.alert("The codemaker submitted their code, start guessing now!");
        }

        else if(receivedMessage.statusUpdate === "GUESS_CORRECT"){
            localGame1.stopGame();
        }

        else if(receivedMessage.statusUpdate === "GUESS_INCORRECT"){
            //@TODO: implement showing how many were right and how many were right in the right place
            localGame1.nextRound();
        }

        else if(receivedMessage.statusUpdate === "GAME_END"){
            localGame1.stopGame();
        }
    }

    //Set up all the error messages tht the server could send
    if(receivedMessage.messageType === "ERROR"){
        //@TODO finish this expression

        if(receivedMessage.errorType === "BAD_MESSAGE"){
            window.alert("Message sent to server was undecipherable, please try again");
        }

        if(receivedMessage.errorType === "BAD_SUBMIT_NOT_ENOUGH"){
            window.alert("Please fill in all four circles for the code");
        }

        if(receivedMessage.errorType === "BAD_SUBMIT_OVERALL"){
            window.alert("Please try to make an accurate guess");
        }

        if(receivedMessage.errorType === "SUBMIT_EARLY"){
            window.alert("Please wait for the codemaker to make a move");
        }

        if(receivedMessage.errorType === "ALREADY_SUBMITTED"){
            window.alert("You can only enter one master code");
        }

        localGame1.codeSetAlready = false;
    }


};






