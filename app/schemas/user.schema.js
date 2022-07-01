const Joi = require("joi");

const userSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userSignUpSchema = Joi.object({
  name: Joi.string().min(4).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  userSignInSchema,
  userSignUpSchema,
};
