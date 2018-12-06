var express = require("express");
var http = require("http");

var port = process.argv[2];
var app = express();

var game = require("./public/javascripts/game.js");

require("./routes/routes.js")(app);

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);