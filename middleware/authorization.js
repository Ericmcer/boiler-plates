'use strict'
/* 
	# AUTHORIZATION MODULE 
	# adds authorization to requests going to API
	# creates signed jwts for controllers
*/

var UserController = require('../controllers/user');
var jwt = require('jsonwebtoken');
var serverConfig = require('../server-config');

var Authorization = {

	//bind permission level of request to req.permissions
	authorize:function(req,res,next){
		console.log('USER',req.user);
		if(req.body.user){
			UserController.get(req.body.user)
			.then(function(user){
				req.permission = {level:user.permission};
				next();
			}, function(err){
				res.status(500);
				res.send(err);
			});
		}else{
			req.permissions = {level:0};
			next();
		}
	},
	jwt:function(data){
		return jwt.sign(data, serverConfig.JWTKey);
	}
}
module.exports = Authorization;