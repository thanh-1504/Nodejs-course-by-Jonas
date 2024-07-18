const express = require("express");
const tourController = require("../controllers/tourController");
const router = express.Router();
// Routes
router.param('idtourController.checkID);
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getATour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
