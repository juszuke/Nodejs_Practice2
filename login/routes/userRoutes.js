"use strict";

const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");
const userValidator = require("../validator/userValidator");

router.get("/", usersController.getAllUsers, usersController.indexView);
router.get("/new", usersController.new);
router.post("/create",
  userValidator,
  usersController.validate,
  usersController.create,
  usersController.authenticate,
  usersController.redirectView
);
router.get("/", usersController.show, usersController.showView);

module.exports = router;
