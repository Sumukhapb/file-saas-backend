// src/config/config.js
require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8000,
  env: process.env.NODE_ENV || "development",

  mongoURI: process.env.MONGO_URI,

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || "7d",
  },
  cookie: {
    expires: Number(process.env.COOKIE_EXPIRES_IN_DAYS) || 7,
  },
};
