const Joi = require("joi");

const objectIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const createBookSchema = Joi.object({
  title: Joi.string().trim().min(1).max(120).required(),
  author: Joi.string().trim().min(1).max(120).required(),
  genre: Joi.string().trim().max(80).optional(),
  publishedYear: Joi.number().integer().min(1000).max(2100).optional(),
  inStock: Joi.boolean().optional(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().trim().min(1).max(120).required(),
  author: Joi.string().trim().min(1).max(120).required(),
  genre: Joi.string().trim().max(80).optional(),
  publishedYear: Joi.number().integer().min(1000).max(2100).optional(),
  inStock: Joi.boolean().optional(),
});

module.exports = {
  objectIdParamSchema,
  createBookSchema,
  updateBookSchema,
};
