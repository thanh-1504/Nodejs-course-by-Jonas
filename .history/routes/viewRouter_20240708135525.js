const express = require("express");
const viewController = require("../controllers/viewController");
const router = express.Router();

router.get("/", viewController.getOverview);

router.get("/tour", (req, res) => {
  res.status(200).render("tour", {
    title: "The Park Camper",
  });
});
module.exports = router;
