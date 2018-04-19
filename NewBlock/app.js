var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var checkoutRoute = require('./routes/checkout');
var contactRoute = require('./routes/contact');
var productsRoute = require('./routes/products');
var registerRoute = require('./routes/register');
var signupRoute = require('./routes/signup');
var singleRoute = require('./routes/single');
var SignUpControlRoute = require('./routes/SignUpControl');

var addProductRoute = require('./routes/addproduct');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/checkout', checkoutRoute);
app.use('/contact', contactRoute);
app.use('/products', productsRoute);
app.use('/register', registerRoute);
app.use('/signup', signupRoute);
app.use('/single', singleRoute);
app.use('/SignUpControl', SignUpControlRoute);
app.use('/addProduct', addProductRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
