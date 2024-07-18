const express = require("express");
const tourControllerWithMongoose = require("../controllers/tourControllerWithMongoose");
const router = express.Router();
  .get(tourControllerWithMongoose.getTours)
  router.route("/").post(tourControllerWithMongoose.createTour);
router
  .route("/:id")
  .get(tourControllerWithMongoose.getTour);
module.exports = router;
