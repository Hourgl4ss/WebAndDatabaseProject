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

    localGame1.playerType = receivedMessage.playertype;

    //If codemaker, make code xd
    if(receivedMessage.playertype === "CODEMAKER") {
        localGame1.setModeCodemaker();
        localGame1.askCode();
    }

    //If guesser, make ready to guess and wait for codemaker to submit
    if(receivedMessage.playertype === "GUESSER"){
        localGame1.setModeGuesser();
    }

    if(receivedMessage.statusMessage === "WRONG_SUBMIT_CODEMAKER"){
        //@TODO finish this expression

        localGame1.codeSetAlready = false;
    }


};






