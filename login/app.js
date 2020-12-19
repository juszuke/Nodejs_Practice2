"use strict";

const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

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
app.use(express.static("public"));;

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.get("/", homeController.index);

app.get("/users", usersController.index, usersController.indexView);
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);
app.get("/users/login", usersController.login);
app.post("/users/login", usersController.authenticate);
app.get("/users/:id", usersController.show, usersController.showView);

app.use(errorController.catch404);
app.use(errorController.handleError);

module.exports = app;
