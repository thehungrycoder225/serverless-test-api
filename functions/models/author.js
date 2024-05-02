const mongoose = require('mongoose');
const authorSchema = require('../schema/author');
const Joi = require('joi');

const AuthorModel = mongoose.model('Author', authorSchema);

const validateAuthor = (author) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(255),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required()
      .min(3)
      .max(255),
    age: Joi.number().required(),
  });
  return schema.validate(author);
};

module.exports = AuthorModel;
module.exports.validate = validateAuthor;
