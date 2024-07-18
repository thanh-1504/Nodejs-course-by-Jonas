const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello from server");
  res.status(200)
});
app.listen(8000, () => console.log("App is listening at port 8000"));
