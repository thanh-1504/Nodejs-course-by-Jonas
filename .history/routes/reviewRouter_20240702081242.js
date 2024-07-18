const express = require("express");
const reviewController = require("./")
const router = express.Router();
router.route("/").get(reviewController.getAllReviews);

module.exports = router;
