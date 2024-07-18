const express = require("express");
const tour
const router = express.Router();

// Routes
router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getATour).patch(updateTour).delete(deleteTour);
module.exports = router;
