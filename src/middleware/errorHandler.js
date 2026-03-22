const HttpError = require("../utils/httpError");

const notFoundHandler = (_req, _res, next) => {
  next(new HttpError(404, "Route not found"));
};

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
