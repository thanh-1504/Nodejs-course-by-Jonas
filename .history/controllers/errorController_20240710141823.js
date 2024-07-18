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

const handleValidationErrorDB = (err) => {
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
  console.log(err);
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error("ERROR 💥", err);
    // 2) Send generic message
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR 💥", err);
  // 2) Send generic message
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  let errorForProduction = Object.create(err);
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
      errorForProduction = handleValidationErrorDB(errorForProduction);
    if (errorForProduction.name === "JsonWebTokenError")
      errorForProduction = handleJSONWebTokenError();
    if (errorForProduction.name === "TokenExpiredError")
      errorForProduction = handleTokenExpiredError();
    sendErrorProduction(errorForProduction, req, res);
  }
  next();
};
