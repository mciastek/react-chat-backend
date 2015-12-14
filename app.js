var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var socket_io = require('socket.io');

var routes = require('./routes/index');
var socket = require('./routes/socket');

var app = express();

var env = process.env.NODE_ENV || 'development';
var io = socket_io();

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.io = io;

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

io.on('connection', socket);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
