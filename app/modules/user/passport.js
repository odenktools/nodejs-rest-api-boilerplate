var LocalStrategy = require('passport-local').Strategy;
var db = require('../../../app/config/database');
var crypto = require('crypto');
var BasicStrategy = require('passport-http').BasicStrategy;
var bcrypt = require('bcryptjs');

exports.running = function (passport) {

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session


	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use(new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password'
		}, function (username, password, done) {

			process.nextTick(function () {
				return check_auth_user(username, password, done);
			});

		}));

	
	passport.use('basic-login', new BasicStrategy(

			function (username, password, done) {

			return check_auth_user(username, password, done);

		}));

	function check_auth_user(username, password, done) {
		
		var mUser = db.dbSocket().query("SELECT * FROM odk_users where username = '"+ username +"'");

		mUser.on('result', function (user_res) {
			
			//console.log(username);

			bcrypt.compare(password, user_res.passwd, function (err, pwdres) {

				var sql = "SELECT id_user, username FROM odk_users WHERE username = '"+ username +"' LIMIT 1;";

				db.connection.query(sql,

					function (err, results) {

					if (err)
						throw err;

					if (results.length > 0) {

						var res = results[0];
						//serialize the query result save whole data as session in req.user[] array
						passport.serializeUser(function (res, done) {
							done(null, res);
						});

						passport.deserializeUser(function (id, done) {
							done(null, res);

						});

						//console.log(results[0]['member_id']);
						return done(null, res);

					} else {

						return done(null, false, {
							message : 'Unknown user ' + username
						});
					}
				});

			});
		});
	}

};
