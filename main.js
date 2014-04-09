
requirejs.config({
    shim: {
        'socketio': {
            exports: 'io'
        },
    },
    paths: {
        socketio: '../socket.io/socket.io',
    }
});

requirejs(['os/client','socketio','os/net/packets'], function (osClient,io,Packets) {

    var socket = io.connect('http://localhost:8085');
    socket.on('connected', function (data) {

        var client = new osClient.handlers.client(socket);
        client.send(new Packets.loginPacket("Stephen", 104));

        client.on('message', function () {
            alert("ClientHandler had an event.");
        });

    });

});