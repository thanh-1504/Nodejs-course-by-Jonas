const mongoose = require('mog')
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
app.listen(8000, () => console.log("App is listening at port 8000"));
