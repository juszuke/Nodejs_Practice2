"use strict";

const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);

module.exports = router;