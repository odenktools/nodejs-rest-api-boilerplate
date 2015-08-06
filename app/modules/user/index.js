/**
 * ---------------------------------------------
 *            MODULES CONFIGURATION IN HERE
 * ---------------------------------------------
 */

var db = require('../../../app/config/database');

var configSocket = require('../../../app/config/iosocket');

var PATH = '/user';

var SOCKET_MOD_NAME = 'User';

var clientPref = 'client';

var serverPref = 'server';

var CL_MOD_PREF = clientPref + SOCKET_MOD_NAME;

var SV_MOD_PREF = serverPref + SOCKET_MOD_NAME;

/** --------------END CONFIG ---------------- **/

/**
 * Express SubModules
 */
module.exports = function (app, io, passport) {
	
	var fetchData = function(socket){
		
		var query = db.dbSocket().query('SELECT * FROM odk_user');
		
		var users = [];
		
		query
		.on('result', function (user) {
			
			
			users.push(user);
			
		})
		.on('end', function () {
			
			if (configSocket.socketConnection.length) {
				
				configSocket.socketConnection.forEach(function (tmpSocket) {
					
					tmpSocket.volatile.emit(SV_MOD_PREF + '-fetch-record', {
						records: users,
						totals: users.length
					});
					
				});
				
			}
			
		});
		
	};

    /**
     * http://localhost:9999/user/insert
     */
    app.post(PATH + '/insert', function (req, res) {

        var username 	= req.body.username;
		var id 			= req.body.id;
		var email 		= req.body.email;

        var data = {};

        data.id = id;
        data.username = username;
        data.email = email;

        console.log('body: ' + JSON.stringify(username));

        io.sockets.volatile.emit('server-doInitialLoad', {
            records: data,
            totals: 1
        });

		res.json({records: {id: data.id, usename: data.username, email: data.email}});
		
    });

};