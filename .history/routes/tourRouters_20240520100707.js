const express = require("express");
const tourController = require("../controllers/tourController");
const router = express.Router();
// Routes
router.param("id", tourController.checkID);
router.route("/")
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkDataValid, tourController.createTour);
router
  .route("/:id")
  .get(tourController.getATour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
