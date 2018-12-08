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
        let currentGameInt = amtOfRunningGames;
        var tempGameName = new game(currentGameInt, false);
        tempGameName.addPlayer(ws, currentlyWaiting);
        gameList.push(tempGameName);
        currentlyWaiting = true;

        ws.send(JSON.stringify({messageType: "CODEMAKER"}));

    } else {
        //Make player join an already waiting player
        let currentGameInt = amtOfRunningGames;
        var tempGameName = gameList[currentGameInt];
        tempGameName.addPlayer(ws, currentlyWaiting);
        
        amtOfRunningGames += 1;
        currentlyWaiting = false;

        ws.send(JSON.stringify({messageType: "GUESSER"}));

        //If mastercode has already been set
        if(tempGameName.masterCode.length !== 0){
            tempGameName.player2.send(JSON.stringify({messageType: "STATUS", statusUpdate: "CODE_SET"}));
        }
    }

    ws.on("message", function incoming(message) {

        //@TODO if player message is new mastercode and the connection is player1, set the mastercode for the game
        //CONDITION: if mastercode.length === 0;
        try{
            //parse received data
            let dataReceived = JSON.parse(message);

            //If the server received mastercode submission coming from the codemaker
            if(dataReceived.submitType === "MASTERCODE" && tempGameName.player1 === ws){
                //If the submission is valid and no other mastercode has been set yet, set mastercode as this submssion
                if((tempGameName.checkSubmission(dataReceived.dataArray) !== null) && (tempGameName.masterCode.length === 0)){
                    //@TODO complete this interaction
                    tempGameName.masterCode = dataReceived.dataArray;
                    ws.send(JSON.stringify({messageType: "STATUS", statusUpdate: "CODE_SET"}));

                    //When player two is connected, also send status update to the guesser
                    if(tempGameName.player2 != null){
                        tempGameName.player2.send(JSON.stringify({messageType: "STATUS", statusUpdate: "CODE_SET"}));
                    }
                    
                //If mastercode already exists, send error message to client
                } else if(tempGameName.masterCode.length !== 0){
                    ws.send(JSON.stringify({messageType: "ERROR", errorType: "ALREADY_SUBMITTED"}));
                } else {
                    //@TODO also add statement for when there arent enough entries in the array, so if .lenth returns 2 or less
                    ws.send(JSON.stringify({messageType: "ERROR", errorType: "BAD_SUBMIT_OVERALL"}));
                }
            }

            //If the server received a code guess from the guesser
            if(dataReceived.submitType === "CODE_GUESS" && tempGameName.player2 === ws){
                
            }

        //Catch exception where the message received did not look like anything previously defined
        } catch(exception){
            console.log("Message received not corresponding to any standard messages");
            console.log(exception);
            ws.send(JSON.stringify({messageType: "ERROR", errorType: "BAD_MESSAGE"}));
        }
        
      });
});

server.listen(port);