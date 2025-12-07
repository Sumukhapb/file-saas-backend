const AppError = require("../utils/AppError");

function requiredRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You don't have permission", 403));
    }
    next();
  };
}

module.exports = requiredRole;
