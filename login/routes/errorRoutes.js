"use strict";

const express = require('express');
const router = express.Router();
const errorController = require("../controllers/errorController");

router.use(errorController.catch404);
router.use(errorController.handleError);

module.exports = router;