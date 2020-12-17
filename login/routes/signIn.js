"use strict";

const express = require('express');
const router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get('/sign-in', function(req, res, next) {
  res.render('signIn');
});
// これの使い方がわからない
router.post('/sign-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign-in',
    failureFlash: true 
  })
);

module.exports = router;
