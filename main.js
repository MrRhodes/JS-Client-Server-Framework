
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

requirejs(['os/client','socketio','os/net/packets','libs/TestAnimation'], function (osClient,io,Packets,app) {

    var connections = [];
    var socket = io.connect('http://localhost:8085');
    socket.on('connected', function (data) {

        var client = new osClient.handlers.client(socket);
        client.send(new Packets.loginPacket("Stephen", 104));

        client.on('new-connection', function (connection) {
            connections.push({
                name: connection.name,
                id: connection.id,
                x: connection.x,
                y: connection.y,
                radius: connection.radius
            })
        });

    });

    app.setup();
    app.world.setup();
    app.play();

});