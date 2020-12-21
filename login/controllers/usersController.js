"use strict";

const User = require("../models/user");
const passport = require("passport");
// const { check, validationResult } = require('express-validator')
const getUserParams = body => {
  return {
    username: body.username,
    email: body.email,
    password: body.password
  };
};

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },

  new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    if (req.skip) return next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (e, user) => {
      if (user) {
        req.flash(
          "success",
          `${user.username}'s account created successfully!`
        );
        res.locals.redirect = "/users";
        next();
      } else {
        req.flash(
          "error",
          `Failed to create user account because: ${e.message}`
          );
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("users/show");
  },
  // エラーになっちゃう
  // validate: (req, res, next) => {
  //   check('username')
  //     .not()
  //     .isEmpty()
  //     .withMessage("NAME は必ず入力して下さい");
  //   check('email')
  //     .isEmail()
  //     .trim()
  //     .normalizeEmail()
  //     .withMessage("MAIL はメールアドレスを記入して下さい");
  //   check('password')
  //     .not()
  //     .isEmpty()
  //     .isLength({min: 7})
  //     .withMessage("Password は7文字以上にしてください");
  //   check('confirm')
  //     .custom((value, { req }) => {
  //       if (value !== req.body.password) {
  //         throw new Error('Password と Confirm Password が一致していません');
  //       }
  //       return true;
  //     });
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   };
  // },
  login: (req, res) => {
    res.render("users/login");
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/users",
    successFlash: "Logged in!"
  }),
  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/users/login";
    next();
  }
};
