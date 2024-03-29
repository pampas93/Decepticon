var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var dev = require('./routes/developers');
var collection = require('./routes/collection');
var graphs = require('./routes/graphs');
var mygraph = require('./routes/mygraph');
var validate = require('./routes/validate');

var BarTemplate1 = require('./routes/GraphSamples/BarTemplate1');
var StackBarTemplate = require('./routes/GraphSamples/StackBarTemplate');
var Pie = require('./routes/GraphSamples/PieTemplate');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use(async (req, res, next) => {
  if (! app.db) {
    const mysql = require('mysql2/promise');
    app.db = await mysql.createPool({
      connectionLimit: 50,
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'charts' });
  }
  req.db = app.db;
  return next();
});*/

app.use(async (req, res, next) => {
  if (!app.db) {
    const mysql = require('mysql2/promise');
    app.db = await mysql.createPool({
      connectionLimit: 50,
      host: 'sql9.freemysqlhosting.net',
      user: 'sql9197276',
      password: 'LAjKNuykNL',
      database: 'sql9197276'
    });
  }
  req.db = app.db;
  return next();
});

app.use('/', index);
app.use('/collection', collection)
app.use('/developers', dev);
app.use('/graphs',graphs);
app.use('/mygraph', mygraph);
app.use('/validate', validate);

app.use('/GraphSamples/BarTemplate1', BarTemplate1);
app.use('/GraphSamples/StackBarTemplate', StackBarTemplate);
app.use('/GraphSamples/PieTemplate', Pie);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
