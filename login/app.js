"use strict";

const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const connectFlash = require("connect-flash");
const User = require("./models/user");

// mongoDB setup
mongoose.connect(
  "mongodb://localhost:27017/login_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

// view engine setup
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

// middleware setup
app.use(layouts);
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use(cookieParser());
app.use(
  expressSession({
    secret: "secretLogIn123",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.get("/", homeController.index);

app.get("/users", usersController.getAllUsers, usersController.indexView);
app.get("/users/new", usersController.new);
app.post("/users/create", 
  usersController.validate,
  usersController.create,
  usersController.authenticate,
  usersController.redirectView
);
app.get("/auth/login", usersController.login);
app.post("/auth/login", usersController.authenticate);
app.get("/users/logout", usersController.logout, usersController.redirectView);
app.get("/users", usersController.show, usersController.showView);

app.use(errorController.catch404);
app.use(errorController.handleError);

module.exports = app;
