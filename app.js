var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
var mongo = require('mongodb');
var monk = require('monk');
var paginate = require('express-paginate');
var w3 = require('w3');
var jquery = require('jquery');
var path = require('path');
const redis = require('redis-clustr');
// var bootstrap = require('bootstrap');
var db = monk('mongodb://10.8.1.13:27017/students');

var routes = require('./routes/ctrpanel');
var users = require('./routes/users');
var index = require('./routes/index');
var student = require('./routes/student');
var addstudent = require('./routes/addstudent');
var ctrpanel = require('./routes/ctrpanel');
var schools = require('./routes/schools');
var applications = require('./routes/applications');
var login = require('./routes/login');
var main = require('./routes/main');
var mongoose = require('mongoose');
var app = express();
var session = require('express-session');


// set up multer for storing uploaded files
 
var multer = require('multer');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'icon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', main);
app.use('/users', users);
app.use('/student', student);
app.use('/addstudent', addstudent);
app.use('/ctrpanel', ctrpanel);
app.use('/schools', schools);
app.use('/index', index);
app.use('/applications', applications);
app.use('/login', login);
app.use('/main', main);
app.use('/jqueryscripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
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

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

const port = 3001

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
 
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
*/

module.exports = app;
