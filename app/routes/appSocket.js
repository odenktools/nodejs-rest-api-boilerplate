var io = require('socket.io');

var sockets;

module.exports.init = function(app,io) {

    var sio = io.listen(app);

    sio.sockets.on('connection', function (socket) {
        //do any cool stuff here
    });

};