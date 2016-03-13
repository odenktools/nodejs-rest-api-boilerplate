var ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
http = require('http'),
connect = require('connect'),
connectSession = require('connect/lib/middleware/session/session'),
fs = require('fs'),
mysql = require('mysql'),
http = require('http'),
path = require('path'),
passport = require('passport'),
io = require('socket.io'),
mySqlStore = require('connect-mysql')(express),
configDb = require('./app/config/database'),
configSocket = require('./app/config/iosocket'),
config = require('./app/config/app')[ENV];

var redis = require('redis');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

/**
 * Use SessionSockets so that we can exchange (set/get) user data b/w sockets and http sessions
 * Pass 'jsessionid' (custom) cookie name that we are using to make use of Sticky sessions.
 */
var SessionSockets = require('session.socket.io');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var socketRedisStore = require('socket.io/lib/stores/redis');
var cookie = require('cookie');

var connectionsArray = [];
var activeClients = 0;
var global_socket = undefined;

var app = express();

var cookieParser = express.cookieParser(config.API.secret);
var server = http.createServer(app);
var sio = io.listen(server);

var allowCrossDomain = function (req, res, next) {

	var origin = (req.headers.origin || "*");

	res.set("Access-Control-Allow-Origin", origin);
	res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'OPTIONS');
	res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	res.set("Access-Control-Allow-Headers", "Accept, Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
	res.set('Access-Control-Allow-Credentials', true);
	next();

}

var redisPub = redis.createClient();
var redisSub = redis.createClient();
var redisClient = redis.createClient();

// =========================================================================
// AUTHENTIFICATION
// =========================================================================
require('./app/modules/user/passport').running(passport);

var sessionSockets;

app.configure(function () {

	sessionStore = new RedisStore({
			client : redisClient,
		});

	sessionSockets = new SessionSockets(sio, sessionStore, cookieParser, 'jsessionid');

	// =========================================================================
	// DATABASE CONFIGURATION
	// =========================================================================
	configDb.setup();

	app.set('port', config.port || process.env.PORT);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(cookieParser);
	app.use(express.bodyParser());
	//app.use(bodyParser.json());
	app.use(express.methodOverride());
	app.use(allowCrossDomain);

	app.use(express.session({
			store : sessionStore,
			secret : config.API.secret,
			key : config.API.key,
			cookie : {
				secure : false,
				maxAge : new Date(Date.now() + 3600000)
				//maxAge : 360*5
			}
		}));

	passport.authorize({
		passport : passport,
		cookieParser : express.cookieParser,
		key : 'connect.sid'
	});

	app.use(passport.initialize());
	//app.use(passport.session());

	app.use(app.router);
	app.use(flash());

});

/**
 */
app.post('/', function (req, res) {

	res.json({
		"state" : "initialize"
	});

});

/**
 * Authentification error
 */
app.get('/authError', function (req, res) {

	res.json({
		"state" : "you must login"
	});

});

/**
 * socket.io stuff. Streaming.
 *
 * http://stackoverflow.com/questions/19156636/node-js-and-socket-io-creating-room
 */
sio.configure(function () {

	sio.set('log level', 1);

	sio.set('store', new socketRedisStore({
			redisPub : redisPub,
			redisSub : redisSub,
			redisClient : redisClient
		}));

	/*
	sio.set('authorization', function (handshakeData, accept) {

	if (handshakeData.headers.cookie) {

	handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);

	handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie[config.API.key], 'secret');

	if (handshakeData.cookie[config.API.key] == handshakeData.sessionID) {
	return accept('Cookie is invalid.', false);
	}

	} else {
	return accept('No cookie transmitted.', false);
	}

	accept(null, true);
	});
	 */

});

/**
 * Socket Connection
 */
sessionSockets.on('connection', function (err, socket) {

	var sessionID = socket.handshake.sessionID;

	session = new connect.middleware.session.Session({
			sessionStore : sessionStore
		}, socket.handshake.session);

	activeClients += 1;

	global_socket = socket;

	connectionsArray.push(socket);

	configSocket.socketConnection.push(socket);

	var socketIndex = configSocket.socketConnection.indexOf(socket);

	socket.on('disconnect', function () {

		if (socketIndex >= 0) {
			configSocket.socketConnection.splice(socketIndex, 1);
		}

	});

});

server.listen(app.get('port'), function () {

	console.log("Express server listening on port " + app.get('port'));

});

/**
 * Module Routing Ada Disini
 */
require('./app/routes/index')(app, sio, passport);
