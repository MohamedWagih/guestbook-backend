const Joi = require("joi");

const messageAddSchema = Joi.object({
  content: Joi.string().min(5).max(120).required(),
});

module.exports = {
  messageAddSchema,
};
