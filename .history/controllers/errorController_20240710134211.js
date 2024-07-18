const AppError = require("../ultils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleVationErrorDB = (err) => {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");
  const message = `Invalid input data. ${errors}`;
  return new AppError(message, 400);
};

const handleJSONWebTokenError = () =>
  new AppError("Invalid Token! Please login again", 401);

const handleTokenExpiredError = () =>
  new AppError("Your token has expired! Please login again", 401);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  }
  console.log("error: ", err);
  return res.status(err.statusCode).render("error", {
    title: "Some thing went wrong!",
    msg: err.message,
  });
};

const sendErrorProduction = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.log("Error: ", err);
    return res.status(500).json({
      status: "error",
      message: "Some thing was wrong",
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Some thing went wrong!",
      msg: err.message,
    });
  }
  console.log(err);
  return res.status(err.statusCode).render("error", {
    title: "Some thing went wrong!",
    msg: "Please try again later",
  });
};

module.exports = (err, req, res, next) => {
  let errorForProduction = Object.assign(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV.trim() === "development")
    sendErrorDev(err, req, res);
  else if (process.env.NODE_ENV.trim() === "production") {
    if (errorForProduction.name === "CastError")
      if (errorForProduction.code === 11000)
        errorForProduction = handleCastErrorDB(errorForProduction);
    errorForProduction = handleDuplicateFieldsDB(errorForProduction);
    if (errorForProduction.name === "ValidationError")
      errorForProduction = handleVationErrorDB(errorForProduction);
    if (errorForProduction.name === "JsonWebTokenError")
      errorForProduction = handleJSONWebTokenError();
    if (errorForProduction.name === "TokenExpiredError")
      errorForProduction = handleTokenExpiredError();
    sendErrorProduction(errorForProduction, req, res);
  }
  next();
};
