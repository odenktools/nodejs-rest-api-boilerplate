/**
 * ---------------------------------------------
 *            MODULES CONFIGURATION IN HERE
 * ---------------------------------------------
 */

var db = require('../../../app/config/database');

var configSocket = require('../../../app/config/iosocket');

var bcrypt = require('bcryptjs');

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
	
	if(app.isUseAuth)
	{
		
	}

	//Use Authentification
	//app.all(PATH + '/*', passport.authenticate('local', {failureRedirect: '/authError'}) );
	
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
	
	io.sockets.on('connection', function (socket) {

		socket.on(CL_MOD_PREF + '-get-record', function () {

			fetchData();

		});
		
		//INSERT DATA USING SOCKET.IO
		socket.on(CL_MOD_PREF + '-insert', function (data) {
			
			var _data = JSON.parse(data.data);
			
			if(_data.kelas_mhs == ''){
				
				_data.kelas_mhs = 'ti7';
			}
			
			var query = db.dbSocket().query("INSERT INTO mahasiswa (nama_mhs,kelas_mhs) VALUES('" + _data.nama_mhs + "','" + _data.kelas_mhs + "');");
			
			var recordsMhs = [];
			
			query
			.on('result', function (resMahasiswa) {
				recordsMhs.push(resMahasiswa);
			})
			.on('end', function () {
				fetchData();
			});
		
		
		});
		
	});
	
    /**
     * http://localhost:9999/mahasiswa/getAll
     */
    app.get(PATH + '/getAll', function (req, res, next) {

        var query = db.dbSocket().query('SELECT * FROM mahasiswa limit 5');

        var recordsMhs = [];

        query
            .on('result', function (resMhs) {
				
				
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
			
			//res.json({records: {id: recordsMhs.insertId, usename: data.username, email: data.email}});
			
			data.id_mhs = recordsMhs.insertId;
			data.totals = 1;

			
			io.sockets.volatile.emit(SV_MOD_PREF + '-doInsertLoad', {
				records : data,
				//nama_mhs: nama_mhs,
				totals: 1
			});
			
			
			//fetchData();
			
			//RECORDS ADALAH JSON (DIPERUNTUKAN REST)
			res.json(data);
			
		});
    });
	
	/**
	 * http://localhost:9999/mahasiswa/insert
	 */
	app.post(PATH + '/edit', function (req, res) {

		//var nama = req.body.id;
		//var kelas = req.body.kelas;
		var id = req.body.id;

		var query = db.dbSocket().query("SELECT * FROM mahasiswa where id_mhs = '" + id + "';");

		var users = [];

		query
		.on('result', function (user) {

			//console.log(user);
			users.push(user);

		})
		.on('end', function () {

			res.json({
				records : users,
				totals : users.length
			});

		});

	});
	
	/**
	 * http://localhost:9999/mahasiswa/hapus
	 */
	app.post(PATH + '/hapus', function (req, res) {
	
		var id = req.body.id;

		db.dbSocket().query("DELETE FROM mahasiswa where id_mhs = '" + id + "';", function (err, info) {

			if (info.affectedRows > 0) {
			
				res.json({
					result : 'success',
					message : 'ok'
				});
				
				fetchData();
				
			} else {

				res.json({
					result : 'gagal',
					message : 'gagal'
				});
			}
		});
	});
	
};