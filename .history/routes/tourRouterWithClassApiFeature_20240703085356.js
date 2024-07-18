const express = require("express");
const tourWithClassTour = require("../controllers/tourWithClassTour");
const authConTroller = require("../controllers/authController");
const router = express.Router();
router
  .route("/top-5-tours")
  .get(tourWithClassTour.aliasTopTours, tourWithClassTour.getTours);

router
  .route("/")
  .get(authConTroller.protect, tourWithClassTour.getTours)
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

  router.route('/:tourId/review').post(authController.protect,)
module.exports = router;
