const mongoose = require("mongoose");
const dotenv = require("dotenv");
process.on("uncaughtException", (err) => {
  console.log("Shutting down!!");
  console.log(err.name, err.message);
});
const app = require("./app");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
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
const server = app.listen(8000, () =>
  console.log("App is listening at port 8000")
);
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Shutting down!!");

  server.close(() => {
    process.exit(1);
  });
});

console.log(x);
