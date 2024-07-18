const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");
const router = express.Router();
router.get("/checkout-session",authController.protect,)

module.exports = router;
