"use strict";

const mongoose = require('mongoose');
const { Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      // required: true,
      // unique: true
    },
    email: {
      type: String,
      // required: true,
      // unique: true
    },
    password: {
      type: String,
      // required: true,
      // minlength: 7
    }
  }, 
  {
    timestamps: true
  }
);

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);
