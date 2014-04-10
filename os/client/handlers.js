
define(['os/handlers', 'os/net/packets', 'libs/EventEmitter'], function (Handlers, Packets, EventEmitter) {

    var ClientHandlers = {};

    ClientHandlers.client = function (_socket) {
        Handlers.base.call(this, _socket);
        this.emitter = new EventEmitter;
    };

    ClientHandlers.client.prototype = Object.create(Handlers.base.prototype);

    ClientHandlers.client.prototype.handleProtocol = function (packet) {
        console.log("Protocol: ", packet);
    };

    ClientHandlers.client.prototype.handleUpdatePosition = function (packet) {
        console.log("Client.handleUpdatePosition");
    };

    ClientHandlers.client.prototype.handleUserDetails = function (packet) {
        
        this.emit('new-connection', packet.valid);

    };

    return ClientHandlers;

});

