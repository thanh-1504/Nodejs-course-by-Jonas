const express = require("express");
const router = express.Router();
router.route("/").get(reviewController.getAllReviews);

module.exports = router;
