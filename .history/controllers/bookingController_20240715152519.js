const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Tour = require("../models/tourModel");
const AppError = require("../ultils/appError");
const catchAsync = require("../ultils/catchAsync");
const factory = require("../controllers/handlerFactory");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  stripe.checkout.session.create({
    payment_method_types: ["card"],
    success_url: 

  })
});
