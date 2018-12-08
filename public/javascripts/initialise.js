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

    localGame1.playerType = receivedMessage.messageType;

    //If codemaker, make code xd
    if(receivedMessage.messageType === "CODEMAKER") {
        localGame1.setModeCodemaker();
        localGame1.askCode();
    }

    //If guesser, make ready to guess and wait for codemaker to submit
    if(receivedMessage.messageType === "GUESSER"){
        localGame1.setModeGuesser();
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






