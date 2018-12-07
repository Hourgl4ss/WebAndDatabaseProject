var socketConnection = new WebSocket("ws://localhost:3000");

socketConnection.onopen = function(event){
    socketConnection.send("hellloooo");
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


};




var localGame1 = new localGame();
initialiseButtonActions(localGame1);
localGame1.showActiveGuessField();

