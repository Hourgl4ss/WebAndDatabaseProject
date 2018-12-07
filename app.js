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

        let someofregerg = JSON.stringify({playertype: "CODEMAKER"});
        ws.send(someofregerg);

    } else {
        //Make player join an already waiting player
        gameList[amtOfRunningGames].addPlayer(ws, currentlyWaiting);
        
        amtOfRunningGames += 1;
        currentlyWaiting = false;

        ws.send(JSON.stringify({playertype: "GUESSER"}));
    }

    ws.on("message", function incoming(message) {

        //@TODO if player message is new mastercode and the connection is player1, set the mastercode for the game
        //CONDITION: if mastercode.length === 0;
        try{
            //let something = JSON.parse(message.data);
            console.log(message);
            x = message;
            console.log(x[0]);
        } catch(exception){
            console.log("Message received not corresponding to any standard messages");
            console.log(exception.message);
        }
        
      });
    
});

server.listen(port);