"use strict";

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');
const mongoose = require('mongoose');
// const flash = require("connect-flash");
// const session = require('express-session');
const layouts = require("express-ejs-layouts");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("./models/user.js");

const errorController = require('./controllers/errorController');
const usersController = require('./controllers/usersController');
const homeController = require('./controllers/homeController');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const signInRouter = require('./routes/signIn');
// const signUpRouter = require('./routes/signUp');

// mongoDB setup
mongoose.connect(
  "mongodb://localhost:27017/user_db", {
    useCreateIndex: true,  
    useNewUrlParser: true,
    useUnifiedTopology: true
  } 
);

// // passport setup
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(layouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // passport setup これもよくわからない
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/sign-in', signInRouter);
// app.use('/sign-up', signUpRouter);

app.get("/sign-in", homeController.showSignIn);

app.get("/users", usersController.index, usersController.indexView);
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);
app.get("/users/:id", usersController.show, usersController.showView)

app.use(errorController.catch404);
app.use(errorController.handleError);

module.exports = app;
