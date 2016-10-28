/*Handle User Validation*/
var axios = require('axios');
var storageName = "CSAuth";
var Authorize = {
	//login with credentials
	login:function(email, password){
		this.checkAuth();
		return axios.post("/api/users/login", {email:email, password:password})
		.then(function(token){
			window.sessionStorage.setItem(storageName, token.data);
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.data;			
			return "Logged In";
		}, function(err){
			return err.response.data;
		});
	},
	//create a new acct with credentials
	signup:function(email, password){
		this.checkAuth();
		return axios.post("/api/users/signup", {email:email,password:password})
		.then(function(token){
			window.sessionStorage.setItem(storageName, token.data);
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.data;			
			return 'Signed up';
		}, function(err){
			return err.response.data;
		}).catch(function(err){
			console.warn('Error in signup', err);
		});
	},
	//reset JWT contents
	reset:function(email){

	},
	//destroy JWT and logged in record
	logout:function(email){

	},
	checkAuth:function(){
		if(axios.defaults.headers.common['Authorization']){
			return;
		}else if(!axios.defaults.headers.common['Authorization'] && window.sessionStorage.getItem(storageName)){
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem(storageName)
		}
		return;
	}

}

module.exports = Authorize;