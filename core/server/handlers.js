
define(['os/handlers','os/net/packets'], function (Handlers,Packets) {

    var EventEmitter = require('events').EventEmitter;

    var ServerHandlers = {};

    ServerHandlers.connect = function (_socket) {

        Handlers.base.call(this, _socket);

        this.emitter = new EventEmitter;

        this.valid = false;
        this.socket.emit('connected');

    };

    ServerHandlers.connect.prototype = Object.create(Handlers.base.prototype);
 //   ServerHandlers.connect.prototype.__proto__ = EventEmitter.prototype;


    ServerHandlers.connect.prototype.handleProtocol = function (packet) {
        console.log(packet);
    };

    ServerHandlers.connect.prototype.handleLogin = function (packet) {
        console.log("NetHandler.Connect.handleConnect");
        console.log("Sending game info to " + packet.name);

        var x = Math.random() * 900;
        var y = Math.random() * 600;
        var user = {
            name: packet.name,
            id: 0,
            x: x,
            y: y,
            x2: x + Math.random() * 2 - 1,
            y2: y + Math.random() * 2 - 1,
            mass: 5 + Math.random() * 10,
            radius: 10 + Math.random() * 5
        };

        this.send(new Packets.userDetails(packet.name, user));
        this.emit('connected');

    };








    ServerHandlers.server = function (_socket) {
       Handlers.base.call(this, _socket);
    };

    ServerHandlers.server.prototype = Object.create(Handlers.base.prototype);
  //  ServerHandlers.server.prototype.__proto__ = EventEmitter.prototype;

    ServerHandlers.server.prototype.handleUpdate = function (packet) {
        console.log("NetHandler.Server.handleUpdate");
    };

    return ServerHandlers;


});

