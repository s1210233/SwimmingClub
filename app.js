var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var params = require('express-params');

var login = require('./routes/login');
var routes = require('./routes/index');
var users = require('./routes/users');
var members = require('./routes/after_login/members');
var create = require('./routes/before_login/create');
var edit = require('./routes/after_login/edit/edit');

var app = express();

var sessionCheck = function(req,res,next){
  if(req.session.user){
    next();
  } else {
      console.log('session error');
      res.redirect('/');
  }
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan({ format: 'dev', immediate: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

app.use('/', routes);
app.use('/users', users);
app.use('/', login);
app.use('/members', members);
app.use('/create', create);
app.use('/edit', edit);
app.use('/', sessionCheck);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
