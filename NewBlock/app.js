
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var Session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var checkoutRoute = require('./routes/checkout');
var contactRoute = require('./routes/contact');
var productsRoute = require('./routes/products');
var registerRoute = require('./routes/register');
var signupRoute = require('./routes/signup');
var singleRoute = require('./routes/single');
var SignUpControlRoute = require('./routes/SignUpControl');
var LogInControlRoute = require('./routes/LogInControl');
//Harvey
var SignOutRoute = require('./routes/SignOut');
var ProfileRoute = require('./routes/ProfileControl');
var ChangeDetailsRoute = require('./routes/ChangeDetailsControl');


// yuli 4.22 -- 5.3
var addProductRouter = require('./routes/addProduct');
var uploadRouter = require('./routes/uploadfile');
var addProductProcessRouter = require('./routes/addproductprocess');
var editProductProcessRouter = require('./routes/editproductprocess');
var searchRouter = require('./routes/search');
var searchResultRouter = require('./routes/result');
var myproductsRouter = require('./routes/myproducts');


var flash = require('connect-flash');

var app = express();

var mongoose=require('mongoose');

mongoose.connect('mongodb://block_business:comp9900@ds259079.mlab.com:59079/comp9900');
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// 5.8 picture cloud
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'blockbusiness',
    api_key: '442659655369817',
    api_secret: 'owZwd3ADFbqpfwXzHmrOEh5srFo'
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser('sessiontest'));

app.use(Session({secret:'max', saveUninitialized: false, resave: false}));
app.use(flash());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/checkout', checkoutRoute);
app.use('/contact', contactRoute);
app.use('/products', productsRoute);
app.use('/register', registerRoute);
app.use('/signup', signupRoute);
app.use('/single', singleRoute);
app.use('/SignUpControl', SignUpControlRoute);
app.use('/LogInControl', LogInControlRoute);

//Harvey
app.use('/SignOut', SignOutRoute);
app.use('/ProfileControl', ProfileRoute);
app.use('/ChangeDetails', ChangeDetailsRoute);

// 4.22 for product -- 5.3
app.use('/uploadfile',uploadRouter);
app.use('/addProduct', addProductRouter);
app.use('/addproductprocess',addProductProcessRouter);
app.use('/editproductprocess',editProductProcessRouter);
app.use('/search',searchRouter);
app.use('/searchresult',searchResultRouter);
app.use('/myproducts',myproductsRouter);


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
