const express = require("express");
const tourControllerWithMongoose = require("../controllers/tourControllerWithMongoose");
const router = express.Router();
router.route("/").post(tourControllerWithMongoose.createTour);
router.
module.exports = router;
