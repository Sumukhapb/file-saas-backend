const AppError = require("../utils/AppError");
const { verifyAccessToken } = require("../utils/jwt");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Not Authenticated", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error("Auth error:", err);
    return next(new AppError("Invalid or expired token", 401));
  }
};
