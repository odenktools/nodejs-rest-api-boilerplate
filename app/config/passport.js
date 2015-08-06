var LocalStrategy = require('passport-local').Strategy;
var db = require('./database');
var crypto = require('crypto');
var BasicStrategy = require('passport-http').BasicStrategy;

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

				var sql = "SELECT id, username FROM tb_user WHERE username = '" + username + "' AND password = '" + crypto.createHash('md5').update(password).digest("hex") + "' LIMIT 1;";

				db.dbSocket().query(sql,

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
						
						return done(null, res);

					} else {

						return done(null, false);

					}
				})

			});

		}));

	
	passport.use('basic-login', new BasicStrategy(

			function (username, password, done) {

			return check_auth_user(username, password, done);

		}));

	function check_auth_user(username, password, done) {

		var sql = "SELECT id, username FROM tb_user WHERE username = '" + username + "' AND password = '" + crypto.createHash('md5').update(password).digest("hex") + "' LIMIT 1;";

		db.dbSocket().query(sql,

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
				
				return done(null, res);

			} else {

				//return done(null, false, res.flash('loginMessage', 'Oops! Wrong password.'));

				return done(null, false);

			}
		});
	}

};
