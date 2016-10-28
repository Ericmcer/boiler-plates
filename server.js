'use strict';

var serverConfig = require('./server-config');

//dependencies
var http = require('http');
var debug = require('debug')(serverConfig.name || 'Application error');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

//middleware
var authorization = require('./middleware/Authorization');

//routes
var users = require('./routes/user');

var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

//setup db connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + serverConfig.dbLocation, function(err){
  if(err){
    throw err;
  }else{
    console.log('DB connection started');
  }
});

//app logging
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//jwt auth
app.use(expressJWT({secret:serverConfig.JWTKey}).unless({path:/\/api\/users/}));

//serving files and API
app.use(authorization.authorize);

app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.send('Route not found');
});


var port = serverConfig.port || 3000
console.log('Starting app on ' + port);
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}