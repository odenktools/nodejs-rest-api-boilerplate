module.exports = {

	development : {
		
		/* Using Linux OS ? */
		useLinux : false,
		
		/* Use Authentification */
		useAuth : false,
		
		/* Nodejs default port ? */
		port : 9999,
		
		domain : 'http://localhost',
		
		/* database settings */
		db : {
			host : 'localhost',
			database : 'nodejs_rest_api',
			user : 'root',
			password : '',
			port : 3306
		},
		
		API : {
			key : 'express.sid',
			secret : 'dZ,DT3+T=}O}TrqE8iv,rHs)o.!YDbx]<^|bK@$*a]w|/<1YQAf18E9`0[FRw$+/',
		},
		
		singly : {
			clientID : "0",
			clientSecret : "0",
			callbackURL : "http://localhost:9999/auth/callback"
		},
		
		email : {
			domain : "smtp.sendgrid.net",
			host : "smtp.sendgrid.net",
			port : 587,
			authentication : "login",
			auth : {
				user : "sg_username",
				pass : "password"
			}
		}
	}
}