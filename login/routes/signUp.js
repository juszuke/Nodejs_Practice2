"use strict";

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/sign-up', function(req, res, next) {
  res.render('signUp');
});

module.exports = router;
