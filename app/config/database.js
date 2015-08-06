var env = process.env.NODE_ENV || 'development';
var mysql = require('mysql');
var config = require('./app')[env];
var _socket = null;

if (config.uselinux) {

    _socket = '/run/mysqld/mysqld.sock';

}

var dbConfig = {

    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
    socketPath: _socket

}

var mysqlConnection = mysql.createConnection(dbConfig);

module.exports.setup = function () {

    mysqlConnection.connect(function (err) {

        if (err) {
            console.log("SQL CONNECT ERROR: " + err);
        } else {
            console.log("SQL CONNECT SUCCESSFUL.");
        }
    });

    mysqlConnection.on("close", function (err) {
        console.log("SQL CONNECTION CLOSED.");
    });

    mysqlConnection.on("error", function (err) {
        console.log("SQL CONNECTION ERROR: " + err);
    });

};

module.exports.config = function () {

    return dbConfig;
};

module.exports.dbSocket = function () {

    return mysqlConnection;

};

module.exports.createConnection = function (config){
	
	return mysql.createConnection(config);
};

module.exports.config = dbConfig;

module.exports.connection = mysqlConnection;