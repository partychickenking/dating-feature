const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username:  String,
  password: String,
  age:   Number
  
});

let User = mongoose.model('User', UserSchema);
module.exports = { User }