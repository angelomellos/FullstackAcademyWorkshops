var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
<<<<<<< HEAD
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');

var routes = require('./routes/index');
var wikiRouter = require('./routes/wiki');
=======
var swig = require('swig');

var setupFilters = require('./filters')

setupFilters(swig)

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
>>>>>>> df6c43923cdac76bcdbdd968e5e254b76ebee5c9
var users = require('./routes/users');

var app = express();

<<<<<<< HEAD
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
=======
app.engine('html', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
>>>>>>> df6c43923cdac76bcdbdd968e5e254b76ebee5c9
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
<<<<<<< HEAD
app.use('/wiki', wikiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
=======

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
>>>>>>> df6c43923cdac76bcdbdd968e5e254b76ebee5c9
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
<<<<<<< HEAD
  swig.setDefaults({ cache: false });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
=======
    swig.setDefaults({ cache: false });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
>>>>>>> df6c43923cdac76bcdbdd968e5e254b76ebee5c9
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
<<<<<<< HEAD
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
=======
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
>>>>>>> df6c43923cdac76bcdbdd968e5e254b76ebee5c9
});


module.exports = app;
