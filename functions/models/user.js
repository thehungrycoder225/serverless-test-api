const Joi = require('joi');
const mongoose = require('mongoose');
const UserSchema = require('../schema/user');

const User = mongoose.model('User', UserSchema);
const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
};

module.exports = User;
module.exports.validate = validateUser;
