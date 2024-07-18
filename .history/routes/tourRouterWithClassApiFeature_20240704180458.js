const express = require("express");
const tourWithClassTour = require("../controllers/tourWithClassTour");
const authConTroller = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");
const reviewRouter = require("../routes/reviewRouter");
const router = express.Router();
router.use("/:tourId/reviews", reviewRouter);
router
  .route("/top-5-tours")
  .get(tourWithClassTour.aliasTopTours, tourWithClassTour.getTours);

router
  .route("/")
  .get(tourWithClassTour.getTours)
  .post(
    authConTroller.protect,
    authConTroller.restrictTo("lead-guide", "admin"),
    tourWithClassTour.createTour
  );

router
  .route("/monthly-plan/:year")
  .get(
    authConTroller.protect,
    authConTroller.restrictTo("admin", "lead-guide", "guide"),
    tourWithClassTour.getMonthlyPlan
  );

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourWithClassTour.getToursWithin);

router.route("/distance/:latlng/unit/:unit").get(tourwi);

router.route("/tour-stats").get(tourWithClassTour.getTourStats);

router
  .route("/:id")
  .get(tourWithClassTour.getTour)
  .patch(
    authConTroller.protect,
    authConTroller.restrictTo("admin", "lead-guide"),
    tourWithClassTour.updateTour
  )
  .delete(
    authConTroller.protect,
    authConTroller.restrictTo("admin", "lead-guide"),
    tourWithClassTour.deleteTour
  );

// router
//   .route("/:tourId/reviews")
//   .post(
//     authConTroller.protect,
//     authConTroller.restrictTo("user"),
//     reviewController.createReview
//   );
module.exports = router;
