const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: String,
  id: String,
  username: String,
  password: String
});

exports.User = mongoose.model('User', UserSchema, 'user');