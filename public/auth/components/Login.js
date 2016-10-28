var React = require('react');
var Authorize = require('../utils/Authorize');
var Login = React.createClass({
	//set react router 
	contextTypes:{
		router:React.PropTypes.object.isRequired
	},
	//setup state
	getInitialState:function(){
		return {
			email:'',
			password:'',
			error:false
		}
	},
	handleUpdateEmail:function(e){
		this.setState({
			email:e.target.value,
			error:false
		});
	},
	handleUpdatePassword:function(e){
		this.setState({
			password:e.target.value,
			error:false
		})
	},
	handleSignupSwitch:function(){
    	this.context.router.push({
      		pathname: '/signup',
      	});
	},
	handleLogin:function(){
		var email = this.state.email;
		var password = this.state.password;
		if(!email || !password){
			this.setState({
				error:"Fields missing"
			});
		}else{
			Authorize.login(email, password)
			.then(
				success =>
					this.setState({
						success:success,
						error:false
					})
			, 	err =>
					this.setState({
						success:false,
						error:err
					})
			)
		}
	},
	render:function(){
		return(
			<div className="">
				<h3>Login
				</h3>
				<a className="" onClick={this.handleSignupSwitch}> create an account.</a>

				<div className="">
					<input className=""
					placeholder="Email"
					name="email"
					onChange={this.handleUpdateEmail}
					value={this.state.email}
					type="text"/>
				</div>
				<div className="">
					<input className=""
					placeholder="Password"
					onChange={this.handleUpdatePassword}
					value={this.state.password}
					type="password"/>
				</div>
				{this.state.error ? <p className="">{this.state.error}</p> : null}
				{this.state.success ? <p className="">{this.state.success}</p> : null}
				<button className=""
					onClick={this.handleLogin}>
					Submit
				</button>
			</div>
		)
	}
});

module.exports = Login;