const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/errorController");
// const tourRouter = require("./routes/tourRouters");
// const tourRouterWithMongoose = require("./routes/tourRouterWithMongoose");
const AppError = require("./ultils/appError");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
const viewRouter = require("./routes/viewRouter");
const tourRouterWithMongoose = require("./routes/tourRouterWithClassApiFeature");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser())
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "price",
      "difficulty",
    ],
  })
);
const corsOptions = {
  origin: "http://localhost:8000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(morgan("dev"));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour",
});

app.use("/api", limiter);
// Routes
// app.use("/api/v1/tours", tourRouter);

app.use("/api/v1/tours", tourRouterWithMongoose);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/", viewRouter);
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
