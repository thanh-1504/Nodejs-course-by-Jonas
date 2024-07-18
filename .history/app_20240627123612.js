const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRouters");
// const tourRouterWithMongoose = require("./routes/tourRouterWithMongoose");
const AppError = require("./ultils/appError");
const userRouter = require("./routes/userRouter");
const tourRouterWithMongoose = require("./routes/tourRouterWithClassApiFeature");
const app = express();
app.use(helmet());
// Middleware
app.use(mongoose.sanitizeFilter(express.json({ limit: "10kb" })));
// app.use(mongoSanitize());
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(morgan("dev"));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour",
});
app.use("/api", limiter);
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  // req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});
// Routes
// app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/tours", tourRouterWithMongoose);
app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `${req.originalUrl} not found in this server`,
  // });
  // const error = new Error(`${req.originalUrl} not found in this server`);
  // error.status = "fail";
  // error.statusCode = 404;
  // next(error); // nếu hàm next mà truyền vào tham số cho nó bất kể là gì thì nó sẽ bỏ qua tất cả các middleware có trong stack và chạy đến error handleing middleware
  next(new AppError(`${req.originalUrl} not found in this server`, 404));
});
// Error handling middleware - nếu truyền vào 4 tham số như dưới thì express sẽ tự động nhận biết đây là middleware xử lý lỗi
app.use(globalErrorHandler);
module.exports = app;
