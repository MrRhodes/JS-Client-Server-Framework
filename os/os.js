
define([

    'os/net',
    'os/net/packets'

], function (

    nethandler,
    packets

    ) {

    var OS = {}

    OS.NetHandler = requirejs('os/net');
    OS.NetHandler.Client = requirejs('os/net/client'),
    NetHandler: nethandler,
        Packets: packets
    };


    return OS;
});
