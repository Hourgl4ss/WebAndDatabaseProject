var express = require("express");
var http = require("http");

module.exports = function(app){

    // app.use(function(req, res, next){
    //     if(req.)
    // });

    app.get("/", function(req, res){
        console.log("returning /");
        res.sendFile("splash.html", {root: "./public"});
    });

    app.post("/game", function(req, res){
        res.sendFile("game.html", {root: "./public"});
    });
}