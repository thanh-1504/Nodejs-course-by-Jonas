const Review = require("../models/reviewModel");
const catchAsync = require("../ultils/catchAsync")
exports.getAllReviews = catchAsync(req,res,next => {
    const reviews = await Review.find();
})

exports.createReview = (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
};
