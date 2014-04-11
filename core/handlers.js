
define(['os/net/packets'],function(Packets) {

    var Handlers = {};

    Handlers.base = function(_socket) {

        this.emitter = null;
        this.socket = _socket;
        this.socket.on('packet', this.readPacket.bind(this));

    };

    Handlers.base.prototype = {

        constructor: Handlers.base,

        on: function(event, callback) {
            this.emitter.on(event, callback);
        },

        emit: function(event,data) {
            this.emitter.emit(event, data);
        },

        handleConnect: function () {
            this.unexpectedHandle("handleConnect");
        },

        handleUpdate: function (packet) {
            this.unexpectedHandle("handleUpdate");
        },

        handleProtocol: function (packet) {
            this.unexpectedHandle("handleProtocol");
        },

        handleLogin: function (packet) {
            this.unexpectedHandle("handleLogin");
        },

        handleUserDetails: function(packet) {
            this.unexpectedHandle("handleUserDetails");
        },

        readPacket: function (packet) {
            
            var packetInstance = new Packets[packet.type];

            for (var prop in packet)
                packetInstance[prop] = packet[prop];

            packetInstance.processPacket(this);

        },

        send: function (packet) {
            this.socket.emit("packet", packet);
        },

        unexpectedHandle: function (handle) {
            throw new Error("\"NetHandler.Base." + handle + "\" not set");
        }

    };

    return Handlers;

});
