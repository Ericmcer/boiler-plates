var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var Main = require('../components/Main');
var Login = require('../components/Login');
var SignUp = require('../components/SignUp');

var routes = (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={Login}/>
			<route path="login" component={Login}/>
			<route path="signup" component={SignUp}/>
		</Route>
	</Router>
)
module.exports = routes;
