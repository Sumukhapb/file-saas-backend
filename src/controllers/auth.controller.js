const bycrpt = require("bcryptjs");
const User = require("../models/user.model");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const { cookie } = require("../config/config");

exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  return res.status(200).json({
    status: "Success",
    data: users,
  });
});

exports.register = catchAsync(async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const { name, email, password, role } = value;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email Already Exist", 409);
  }

  const hashedPassword = await bycrpt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  return res.status(201).json({
    status: "success",
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const { email, password } = value;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Inavalid Email or User", 401);
  }

  const isMatch = await bycrpt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid Password", 401);
  }

  const payload = { id: user.id, email: user.email };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: cookie.expires * 24 * 60 * 60 * 1000,
  });
  console.log("Sent refresh cookie:", refreshToken);

  return res.status(200).json({
    status: "Success",
    token: accessToken,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.refresh = catchAsync(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    throw new AppError("Invalid Token", 401);
  }

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("User No Longer Exists!!", 401);
  }

  const newAccessToken = signAccessToken({ id: user.id, email: user.email });

  return res.status(200).json({
    status: "Success",
    token: newAccessToken,
  });
});

exports.logout = catchAsync((req, res) => {
  res.clearCookie("refreshToken");

  return res.status(200).json({
    status: "Success",
    message: "User Logout Success",
  });
});
