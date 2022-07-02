const Joi = require("joi");

const replyAddSchema = Joi.object({
  content: Joi.string().min(5).max(120).required(),
});

module.exports = {
  replyAddSchema,
};
