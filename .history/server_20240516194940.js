const mongoose = require("mongoose");
const dotenv = require("dotenv");
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

// Add data to database mongo
// const addData = new Tour({
//   name: "The Losangeles",
//   rating: 5,
// });
// addData
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(err));

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
const app = require("./app");
app.listen(8000, () => console.log("App is listening at port 8000"));
