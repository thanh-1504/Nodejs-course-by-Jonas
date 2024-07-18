const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.status(200).json({ name: "Express JS", author: "Nhat thanh" });
  res.status(200).send("Hello from server");
});

app.post("/")
app.listen(8000, () => console.log("App is listening at port 8000"));
