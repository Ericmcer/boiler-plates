var React = require('react');
var Authorize = require('../utils/Authorize');

var Signup = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
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
	handleLoginSwitch:function(){
    	this.context.router.push({
      		pathname: '/login',
      	});
	},
	handleSignup: function () {
		var email = this.state.email;
		var password = this.state.password;
		if(!email || !password){
			this.setState({
				error:"Fields missing"
			});
		}else{
			Authorize.signup(email, password)
			.then(
				msg =>
					(msg === 'Signed up' ? this.setState({ success:msg, error:false }) : this.setState({ success:false, error:msg }))
			);
		}		

	},
	render:function(){
		return(
			<div className="">
				<h3>Signup
				</h3>
				<a  className="" onClick={this.handleLoginSwitch}> Already a member?</a>

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
					name="password"
					placeholder="Password"
					onChange={this.handleUpdatePassword}
					value={this.state.password}
					type="password"/>
				</div>
				{this.state.error ? <p className="">{this.state.error}</p> : null}
				{this.state.success ? <p className="">{this.state.success}</p> : null}
				<button className=""
					onClick={this.handleSignup}>
					Submit
				</button>
			</div>
		)
	}
});

module.exports = Signup;