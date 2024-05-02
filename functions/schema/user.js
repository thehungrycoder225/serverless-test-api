const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const config = require('config');
const jwtPrivateKey = secret;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// userSchema.methods.generateAuthToken = function () {
//   return jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     config.get('jwtPrivateKey')
//   );
// };

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, jwtPrivateKey);
};
module.exports = userSchema;
