var express = require('express');
var router = express.Router();
var UserCtrl = require('../controllers/user');
var auth = require('../middleware/authorization');

/* GET users listing. */
router.post('/login', function(req, res, next) {
	if(req.permission > 0){
		res.status(401);
		res.send('Permission to access this route denied');
	}else{
		UserCtrl.login(req.body, function(err, success){
			if(err){
				console.log('CSERR', err);
				res.status(err.status);
				res.send(err.message);
			}else{
				res.status(200);
				res.send(success);
			}
		});
	}
});

router.post('/signup', function(req,res,next){
	if(req.permission > 0){
		res.status(401);
		res.send('Permission to access this route denied');
	}else{
		UserCtrl.signup(req.body, function(err,success){
			console.log('mongo status ', err, success);
			if(err){
				console.log('CSERR', err);
				res.status(400);
				res.send(err.message);
			}else{
				var token = auth.jwt(success);
				res.status(200).json(token);
			}
		});
	}
});

module.exports = router;
