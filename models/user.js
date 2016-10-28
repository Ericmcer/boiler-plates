'use strict';

var mongoose = require('mongoose');

//schema
var userSchema = new mongoose.Schema({
	firstName:{
		type:'string'
	},
	lastName:{
		type:'string'
	},
	email:{
		type:'string',
		required:true,
		unique:true
	},
	password:{
		type:'string',
		required:true
	},
	permission:{
		type:'number',
		required:true
	}
});

//custom error handling for user schema
userSchema.post('save', function(err, doc, next){
	if(err){
		if(err.name === 'MongoError' && err.code === 11000){
			err = {message:"Email already in use"};
			next(err);
		}
	}else{
		next();
	}
});

module.exports = mongoose.model('user', userSchema);