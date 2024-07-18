const Review = require("../models/reviewModel");
const catchAsync = require("../ultils/catchAsync");
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: "success",
    result: reviews.length,
    data: { reviews },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body)
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    data: { newReview },
  });
});
