const express = require("express");
const tourControllerWithMongoose = require("../controllers/tourControllerWithMongoose");
const router = express.Router();
router
  .route("/")
  .get(tourControllerWithMongoose.getTours)
  .post(tourControllerWithMongoose.createTour);
router.route("/:id").get(tourControllerWithMongoose.getTour);
module.exports = router;
