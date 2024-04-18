const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  age: {
    type: Number,
    required: true,
  },
  username: String,
  password: String,
});

// Pre-save hook to generate username and password

authorSchema.pre('save', function (next) {
  const username = this.name.toLowerCase().replace(/\s/g, '');
  const password = `${this.name
    .substring(0, 3)
    .toLowerCase()}${this.email.substring(0, 3)}${this.age}`;
  this.username = username;
  this.password = password;
  next();
});

module.exports = authorSchema;
