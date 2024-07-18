const express = require('express');
const tourControllerWithMongoose = require("../controllers/tourControllerWithMongoose");
const router = express.router();
router.route('/').post(tourControllerWithMongoose.createTour);