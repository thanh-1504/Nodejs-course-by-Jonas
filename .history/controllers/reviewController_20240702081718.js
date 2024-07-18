const Review = require("../models/reviewModel");
const catchAsync = require("../ultils/catchAsync");
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status:"success",
    data: {
        
    }
  })
});

exports.createReview = (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
};
