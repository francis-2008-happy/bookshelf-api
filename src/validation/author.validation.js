const Joi = require("joi");

const objectIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const createAuthorSchema = Joi.object({
  name: Joi.string().trim().min(1).max(120).required(),
  birthYear: Joi.number().integer().min(1000).max(2100).optional(),
  nationality: Joi.string().trim().max(80).optional(),
  biography: Joi.string().trim().max(1000).optional(),
  website: Joi.string().uri().optional().allow(""),
});

const updateAuthorSchema = Joi.object({
  name: Joi.string().trim().min(1).max(120).required(),
  birthYear: Joi.number().integer().min(1000).max(2100).optional(),
  nationality: Joi.string().trim().max(80).optional(),
  biography: Joi.string().trim().max(1000).optional(),
  website: Joi.string().uri().optional().allow(""),
});

module.exports = {
  objectIdParamSchema,
  createAuthorSchema,
  updateAuthorSchema,
};
