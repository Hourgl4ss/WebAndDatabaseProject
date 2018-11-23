var fs = require('fs');
var net = require('net');

var file = process.argv[2];

var server = net.createServer(function(connection){

    connection.write("Yayeet");

    connection.on('close', function () {
        console.log("Subscriber disconnected");
        watcher.close();
    });
});

server.listen(3000, function(){
    console.log("Listening for connections...");
});