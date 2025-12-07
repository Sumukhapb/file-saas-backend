const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(2).max(10).required(),
  role: Joi.string().valid("user", "admin").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(2).max(10).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
