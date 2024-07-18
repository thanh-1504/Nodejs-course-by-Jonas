const express = require("express");
const router = express.Router();
app.get("/", (req, res) => {
  res.status(200).render("base", {
    tour: "The Test Variable Pug Local",
    user: "Nhat Thanh",
  });
});

app.get("/overview", (req, res) => {
  res.status(200).render("overview", {
    title: "All Tours",
  });
});

app.get("/tour", (req, res) => {
  res.status(200).render("tour", {
    title: "The Park Camper",
  });
});
module.exports = router;
