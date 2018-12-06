var socketConnection = new WebSocket("ws://localhost:3000");

socketConnection.onopen = function(event){
    socketConnection.send("hellloooo");
}

socketConnection.onmessage = function(event){
    console.log(event);
};




var localGame1 = new localGame();
initialiseButtonActions(localGame1);
localGame1.showActiveGuessField();

