const stripe = require("stripe")(
  "sk_test_51PcjWORsTmgy7LReLiDk1jsw2gnK7lGCda5ZJorFsSEPHjO1tovjXVcApZsCdB7iVe6AMtfN8xMzL1ibWdxuTgEA00SxDrYOkM"
);
const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const AppError = require("../ultils/appError");
const catchAsync = require("../ultils/catchAsync");
const factory = require("../controllers/handlerFactory");
const Booking = require("../models/bookingModel");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    // success_url: `${req.protocol}://${req.get("host")}/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get("host")}/my-tours`,
    cancel_url: `${req.protocol}://${req.get("host")}/`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get("host")}/img/tours/${
                tour.imageCover
              }`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });
  //   res.redirect(303, session.url);
  res.status(200).json({
    status: "success",
    url: session.url,
  });
});

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   const { tour, user, price } = req.query;
//   if (!tour && !user && !price) return next();
//   await Booking.create({ tour, user, price });
//   res.redirect(req.originalUrl.split("?")[0]);
// });

const createBookingCheckout = (async (session) => {
  const tourId = session.client_reference_id;
  const userId = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ tourId, userId, price });
});

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      // process.env.STRIPE_WEBHOOK_SECRET
      "whsec_ffbIUnMUC6EARf7kO5kxkGzodocDVWdk"
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    createBookingCheckout(event.data.object);
  }
  res.status(200).json({
    received: true,
  });
  next();
};
