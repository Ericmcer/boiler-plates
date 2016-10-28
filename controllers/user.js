var User = require('../models/user');
var crypto = require('crypto');


function encPw(pw, oldSalt){
	try{
		var salt = oldSalt || crypto.randomBytes(16).toString('base64');
		return crypto.pbkdf2Sync(pw, new Buffer(salt,'base64'), 10000, 64, 'sha512').toString('base64');
	}catch(e){
		console.error('CSERR', e);
	}
}
var UserController = {

	signup:function(user, cb){
		user.password = encPw(user.password);
		user.permission = 1;
		User.create(user, cb);
	}
}

module.exports = UserController;