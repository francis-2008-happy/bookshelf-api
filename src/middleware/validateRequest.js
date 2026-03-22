const Joi = require("joi");
const HttpError = require("../utils/httpError");

const validateBody = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) {
    const details = error.details.map((detail) => detail.message).join(", ");
    return next(new HttpError(400, `Validation error: ${details}`));
  }

  req.body = value;
  return next();
};

const validateParams = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.params, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) {
    const details = error.details.map((detail) => detail.message).join(", ");
    return next(new HttpError(400, `Validation error: ${details}`));
  }

  req.params = value;
  return next();
};

module.exports = {
  validateBody,
  validateParams,
};
