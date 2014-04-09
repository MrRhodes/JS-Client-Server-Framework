
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

        this.send(new Packets.updatePositionPacket(Math.random(), Math.random()));

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

