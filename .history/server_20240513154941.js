const dotenv = require('dotenv')
const app = require("./app");
dotenv.config('./config')
console.log(process.env);
app.listen(8000, () => console.log("App is listening at port 8000"));
