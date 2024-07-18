const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");
const router = express.Router();
// Routes
router
  .route("/")
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.checkDataValid, tourController.createTour);
router.param("id", tourController.checkID);
router
  .route("/:id")
  .get(tourController.getATour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
