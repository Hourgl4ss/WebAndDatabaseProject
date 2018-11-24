var http = require("http");
var url = require("url");
var express = require("express");
var port = process.argv[2];
var app = express();

var onConnectFun = function(request, response){

    var parsedUrl = url.parse(request.url, true);


    response.writeHead(200, {"Content-type": "text/plain"});
    response.end("Hello world!");
    console.log("HTTP request 200 ok sent");
}

http.createServer(app).listen(port);