const stripe = require("str")
const Tour = require("../models/tourModel");
const AppError = require("../ultils/appError");
const catchAsync = require("../ultils/catchAsync");
const factory = require("../controllers/handlerFactory");

exports.getCheckoutSession = (req, res, next) => {};
