/**
 * ---------------------------------------------
 *            MODULES CONFIGURATION IN HERE
 * ---------------------------------------------
 */

var db = require('../../../app/config/database');

var configSocket = require('../../../app/config/iosocket');

/**
 *
 */
var PATH = '/mahasiswa';

/**
 * Define the module name
 */
var SOCKET_MOD_NAME = 'Mahasiswa';

var clientPref = 'client-';

var serverPref = 'server-';

var CL_MOD_PREF = clientPref + SOCKET_MOD_NAME;

var SV_MOD_PREF = serverPref + SOCKET_MOD_NAME;

/** --------------END CONFIG ---------------- **/

/**
 * Express SubModules
 */
module.exports = function (app, io, passport) {
	
	var fetchData = function(socket){
		
		var query = db.dbSocket().query('SELECT * FROM mahasiswa');
		
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
     * http://localhost:9999/mahasiswa/getAll
     */
    app.get(PATH + '/getAll', function (req, res, next) {

        var query = db.dbSocket().query('SELECT * FROM mahasiswa limit 5');

        var recordsMhs = [];

        query
            .on('result', function (resMhs) {

                //console.log(mahasiswa);
                recordsMhs.push(resMhs);

            })
            .on('end', function () {
			
			if (configSocket.socketConnection.length) {
				
				configSocket.socketConnection.forEach(function (tmpSocket) {
					
					console.log(SV_MOD_PREF + '-get-record');
					
					tmpSocket.volatile.emit(SV_MOD_PREF + '-get-record', {
						records: recordsMhs,
						totals: recordsMhs.length
					});
					
				});
				
			}
                res.json({records: recordsMhs, totals: recordsMhs.length});
            });

    });
	
    /**
     * http://localhost:9999/mahasiswa/insert
     */
    app.post(PATH + '/insert', function (req, res) {

        var nama_mhs = req.body.nama_mhs;
        var kelas_mhs = req.body.kelas_mhs;
        //var id = req.body.id;
		
        var data = {};

        //data.id = id;
        data.nama_mhs = nama_mhs;
        data.kelas_mhs = kelas_mhs;
		
		var query = db.dbSocket().query("INSERT INTO mahasiswa (nama_mhs,kelas_mhs) VALUES('" + nama_mhs + "','" + kelas_mhs + "');");
		var recordsMhs = [];
		
		query
		.on('result', function (resMahasiswa) {
			
			
			recordsMhs.push(resMahasiswa);
			
		})
		.on('end', function () {
			
			console.log('body: ' + JSON.stringify(nama_mhs));
			
			io.sockets.volatile.emit(SV_MOD_PREF + '-doInsertLoad', {
				nama_mhs: nama_mhs,
				totals: 1
			});
			
			//RECORDS ADALAH JSON (DIPERUNTUKAN REST)
			res.json({nama_mhs: nama_mhs});
			
		});
    });

};