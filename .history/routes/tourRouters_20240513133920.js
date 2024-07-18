const express = require("express");
const tourController = require("../controllers/tourController");
const router = express.Router();

// Routes
router.route("/").get(tourController.getAllTours).post(tourController.createTour);
router.route("/:id").get(tourController.getATour).patch(updateTour).delete(deleteTour);
module.exports = router;
