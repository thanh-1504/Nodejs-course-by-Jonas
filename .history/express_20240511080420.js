const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.status(200).send("Hello from server");
  res.status(200).json("")
});
app.listen(8000, () => console.log("App is listening at port 8000"));
