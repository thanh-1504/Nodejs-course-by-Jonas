const catchAsync = require("../ultils/catchAsync");
const AppError = require("../ultils/appError");
exports.deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) throw new AppError("No document found with that ID", 404);
    res.status(204).json({
      status: "success",
      message: "delete successful",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res) => {
    const tour = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      tour: tour,
    });
  });
