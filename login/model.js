const monogoose = require('monogoose');

const UserSchema = monogoose.Schema({
  name: String,
  email: String,
  password: String
});

exports.User = monogoose.model('User', UserSchema);