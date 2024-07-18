const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const catchAsync = require("../ultils/catchAsync");
const AppError = require("../ultils/appError");
const User = require("../models/userModel");
const sendEmail = require("../ultils/email");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
exports.signUp = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    user: newUser,
  });
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check email and password exists
  if (!email || !password)
    throw new AppError("Please prodive your email and password", 400);
  // Check email and password exists and correct
  const user = await User.findOne({ email }).select("+password");
  const correct = await user.correctPassword(password, user.password);
  if (!user || !correct) throw new AppError("Password or email incorrect", 401);
  // If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check of it's here
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token)
    throw new AppError(
      "You are not logged in! Please log in to get access",
      401
    );
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    throw new AppError(
      "The user belonging to this token does no longer exist",
      401
    );
  // 4) Check if user changed pasword after the token was issued
  if (currentUser.changedPassword(decoded.iat))
    throw new AppError(
      "User recently changed password! Please login again",
      401
    );
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You don't have permisson to perform this action!", 403)
      );
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new AppError("Email not exists", 404);
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token valid for 10 minutes",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError("Some thing was wrong", 500);
  }

  next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new AppError("",400)
});
