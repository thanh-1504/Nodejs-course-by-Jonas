const mongoose = require("mongoose");
const dotenv = require("dotenv");
process.on("uncaughtException", (err) => {
  console.log("Shutting down!!");
  console.log(err.name, err.message);
  process.exit(1);
});
const app = require("./app");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;
// Kết nối với data bằng server remote
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("Data connection successful!");
  });

// Kết nối với local database bằng chính server của máy mình
// mongoose
//   .connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((con) => {
//     console.log("Data connection successful!");
//   });
const port = process.env.PORT || 8000;
const server = app.listen(port () =>
  console.log("App is listening at port 8000")
);
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Shutting down!!");
  server.close(() => {
    process.exit(1);
  });
});
