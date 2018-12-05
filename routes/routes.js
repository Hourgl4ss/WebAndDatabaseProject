var express = require("express");
var http = require("http");

module.exports = function(app){

    app.get("/", function(req, res){
        console.log("returning /");
        res.sendFile("splash.html", {root: "./public"});
    });

    app.get("/game", function(req, res){
        res.sendFile("splash.html", {root: "./public"});
    });

    app.post("/game", function(req, res){
        console.log(res);
        res.sendFile("game.html", {root: "./public"});
        //@TODO only move player here if they used the splash screen button
    });
}