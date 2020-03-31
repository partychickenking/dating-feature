const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username:  String,
  email: String,
  password: String,
  locationAcces: Boolean,
  gender: Boolean,
  age: Number,
  sexuality: Boolean,
  movies: Array,
  music: Array
});

let User = mongoose.model('User', UserSchema);
module.exports = User;