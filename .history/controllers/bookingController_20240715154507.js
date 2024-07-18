const stripe = require("stripe")('sk_test_51PcjWORsTmgy7LReLiDk1jsw2gnK7lGCda5ZJorFsSEPHjO1tovjXVcApZsCdB7iVe6AMtfN8xMzL1ibWdxuTgEA00SxDrYOkM');
const Tour = require("../models/tourModel");
const AppError = require("../ultils/appError");
const catchAsync = require("../ultils/catchAsync");
const factory = require("../controllers/handlerFactory");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      {
        price_data: {
          unit_amount: tour.price * 100,
          currency: "usd",
          product_data: {
            name: `${tour.name} Tour`,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
            description: tour.summary,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });
  res.status(200).json({
    status: "success",
    session,
  });
});
