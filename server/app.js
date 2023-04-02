require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const connection = require('./DB/db')


// //Admin Routes
// const adminLogin = require("./routes/AdminRoutes/adminLogin");
// const adminSignup = require("./routes/AdminRoutes/adminSignup")
// const activeUsers = require("./routes/AdminRoutes/activeUsers")

// //User Routes
// const signup = require('./routes/UserRoutes/signup');
// const login = require('./routes/UserRoutes/login');
// const home = require('./routes/UserRoutes/home');
// const donorProfile = require('./routes/UserRoutes/donorProfile')
// const receiverProfile = require('./routes/UserRoutes/receiverProfile')

const userController=require('./controllers/User/userController')
const adminController=require('./controllers/Admin/adminController')
const donorController=require('./controllers/User/Donor/donorController')
const receiverController=require('./controllers/User/Receiver/receiverController')
const bloodController=require('./controllers/Admin/bloodController')


const app = express();

//database connection
connection()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//User Routes
// app.use("/api/signup", signup);
// app.use("/api/login", login);
// app.use("/api/home", home);
// app.use("/api/donorProfile", donorProfile)
// app.use("/api/recieverProfile", receiverProfile)


//Admin Routes
// app.use("/api/admin_signup", adminSignup)
// app.use("/api/admin_login", adminLogin);
// app.use("/api/activeUsers", activeUsers)


app.use('/user', userController);
// app.use('/profile', profileController);
app.use('/admin',adminController)
// app.use('/upload', uploadController)
app.use('/donor',donorController)
app.use('/receiver',receiverController)
app.use('/blood',bloodController)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
