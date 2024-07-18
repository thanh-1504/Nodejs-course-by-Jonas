const express = require("express");
const tourControllerWithMongoose = require("../controllers/tourControllerWithMongoose");
const { route } = require("./tourRouters");
const router = express.Router();
router
  .route("/top-5-tours")
  .get(
    tourControllerWithMongoose.aliasTopTours,
    tourControllerWithMongoose.getTours
  );

router
  .route("/")
  .get(tourControllerWithMongoose.getTours)
  .post(tourControllerWithMongoose.createTour);

router.route("/tour-stats").get(tourControllerWithMongoose.getTourStats);
route

router
  .route("/:id")
  .get(tourControllerWithMongoose.getTour)
  .patch(tourControllerWithMongoose.updateTour)
  .delete(tourControllerWithMongoose.deleteTour);

module.exports = router;
