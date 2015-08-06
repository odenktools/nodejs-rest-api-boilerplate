var LocalStrategy = require('passport-local').Strategy;

var crypto = require('crypto');

var db = require('../config/db');

exports.auth = function (passport){

    passport.use(new LocalStrategy(
	
		// by default, local strategy uses username and password, we will override with email
        //usernameField : 'username',
        //passwordField : 'password',
        //passReqToCallback : true ,
		
        function (username, password, done) {

			process.nextTick(function () {
				return check_auth_user(username, password, done);
			});
			
        }

    ));

    function check_auth_user(username, password, done) {

        var sql = "SELECT id, username FROM user WHERE username = '"+ username +"' AND passwd = '"+ crypto.createHash('md5').update(password).digest("hex") +"' LIMIT 1;";

        //console.log(username);

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
                        message: 'Unknown user ' + username
                    });
					
                    //return done(null, false);

                }
            }

        );
    }

};