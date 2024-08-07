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
  .post(tourWithClassTour.createTour);

router.route("/monthly-plan/:year").get(tourWithClassTour.getMonthlyPlan);

router.route("/tour-stats").get(tourWithClassTour.getTourStats);

router
  .route("/:id")
  .get(tourWithClassTour.getTour)
  .patch(tourWithClassTour.updateTour)
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
