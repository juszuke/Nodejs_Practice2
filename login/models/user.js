"use strict";

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7
  }
}, 
{
  timestamps: true
});

exports.User = mongoose.model('User', UserSchema);