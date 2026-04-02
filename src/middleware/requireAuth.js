const HttpError = require("../utils/httpError");

const requireAuth = (req, _res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return next(new HttpError(401, "Authentication required"));
};

module.exports = requireAuth;
