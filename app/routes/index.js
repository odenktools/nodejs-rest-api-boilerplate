module.exports = function (app, io, passport) {
	
	require('../modules/mahasiswa/index')(app, io, passport);
	require('../modules/user/index')(app, io, passport);

};