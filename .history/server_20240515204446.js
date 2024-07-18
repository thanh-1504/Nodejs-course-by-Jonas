const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace()
mongoose.connect();
const app = require("./app");
app.listen(8000, () => console.log("App is listening at port 8000"));
