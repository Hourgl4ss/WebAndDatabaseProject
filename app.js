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
        let tempGameName = new game(amtOfRunningGames, false);
        tempGameName.addPlayer(ws, currentlyWaiting);
        gameList.push(tempGameName);
        currentlyWaiting = true;

        ws.send("CODEMAKER");

    } else {
        //Make player join an already waiting player
        gameList[amtOfRunningGames].addPlayer(ws, currentlyWaiting);
        
        amtOfRunningGames += 1;
        currentlyWaiting = false;

        ws.send("GUESSER");
    }

    ws.on("message", function incoming(message) {
        console.log(message);
      });
    
});

server.listen(port);