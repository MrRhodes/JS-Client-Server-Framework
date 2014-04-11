

define(function () {

    var Packets = {};

    // Packets.
    Packets.packet = function () {
        this.type = undefined;
    };

    Packets.packet.prototype = {
        constructor: Packets.packet,
        getData: function () {
            return this.data;
        },
        processPacket: function (_handler) {
            throw new Error("You need to override the base packets processPacket method.");
        }
    };


    Packets.updatePositionPacket = function (_x, _y) {
        Packets.packet.call(this);
        this.type = "updatePositionPacket";
        this.x = _x
        this.y = _y;
    }

    Packets.updatePositionPacket.prototype = Object.create(Packets.packet.prototype);

    Packets.updatePositionPacket.prototype.processPacket = function (_handler) {
        _handler.handleUpdatePosition(this);
        _handler.emit('message');
    }



    Packets.loginPacket = function (_name, _version) {
        Packets.packet.call(this);
        this.type = "loginPacket";
        this.name = _name;
        this.version = _version;
    }

    Packets.loginPacket.prototype = Object.create(Packets.packet.prototype);

    Packets.loginPacket.prototype.processPacket = function (_handler) {
        _handler.handleLogin(this);
    }



    Packets.userDetails = function (_name, _valid) {
        Packets.packet.call(this);
        this.type = "userDetails";
        this.name = _name;
        this.valid = _valid;
    }

    Packets.userDetails.prototype = Object.create(Packets.packet.prototype);

    Packets.userDetails.prototype.processPacket = function (_handler) {
        _handler.handleUserDetails(this);
    }




    return Packets;


});
