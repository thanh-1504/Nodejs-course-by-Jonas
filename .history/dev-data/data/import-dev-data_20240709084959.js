const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModel");
const Review = require("../../models/reviewModel");
const User = require("../../models/userModel");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE?.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("Data connection successful!");
  });
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const importData = async () => {
  try {
    await Tour.create(tours);
    await Review.create(reviews);
    await User.create(users, { validateBeforeSave: false });
    console.log("Data loaded successful");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    console.log("data deleted successful");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === "--import") importData();
else if (process.argv[2] === "--delete") deleteData();
