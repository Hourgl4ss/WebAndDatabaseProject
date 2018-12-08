var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];

var app = express();
app.use(express.static(__dirname + "/public"));
require("./routes/routes.js")(app);

var server = http.createServer(app);
const websocketServer = new websocket.Server({server});

var websocketList = {};
var gameList = [];
var game = require("./game.js");

var currentlyWaiting = false;
var amtOfRunningGames = 0;

websocketServer.on("connection", function connection(ws){

    if(!currentlyWaiting){

        //Initiate new game because noone is waiting for another player to join
        var tempGameName = new game(amtOfRunningGames, false);
        tempGameName.addPlayer(ws, currentlyWaiting);
        gameList.push(tempGameName);
        currentlyWaiting = true;

        ws.send(JSON.stringify({messageType: "CODEMAKER"}));

    } else {
        //Make player join an already waiting player
        gameList[amtOfRunningGames].addPlayer(ws, currentlyWaiting);
        
        amtOfRunningGames += 1;
        currentlyWaiting = false;

        ws.send(JSON.stringify({messageType: "GUESSER"}));
    }

    ws.on("message", function incoming(message) {

        //@TODO if player message is new mastercode and the connection is player1, set the mastercode for the game
        //CONDITION: if mastercode.length === 0;
        try{
            //parse received data
            let dataReceived = JSON.parse(message);

            //If we received mastercode submission coming from the codemaker
            if(dataReceived.submitType === "MASTERCODE" && tempGameName.player1 === ws){
                //If the submission is valid and no other mastercode has been set yet, set mastercode as this submssion
                if((tempGameName.checkSubmission(dataReceived.dataArray) !== null) && (tempGameName.masterCode.length === 0)){
                    tempGameName.masterCode = dataReceived.dataArray;
                
                //If mastercode already exists, send error message to client
                } else if(tempGameName.masterCode.length !== 0){
                    ws.send(JSON.stringify({messageType: "ERROR", errorType: "ALREADY_SUBMITTED"}));
                } else {
                    //@TODO also add statement for when there arent enough entries in the array, so if .lenth returns 2 or less
                    ws.send(JSON.stringify({messageType: "ERROR", errorType: "BAD_SUBMIT_OVERALL"}));
                }
            }


        } catch(exception){
            console.log("Message received not corresponding to any standard messages");
            console.log(exception);
            ws.send(JSON.stringify({messageType: "ERROR", errorType: "BAD_MESSAGE"}));
        }
        
      });
});

server.listen(port);