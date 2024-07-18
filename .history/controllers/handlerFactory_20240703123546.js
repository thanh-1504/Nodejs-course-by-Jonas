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
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw new AppError("No document found with that ID", 404);
    res.status(200).json({
      status: "success",
      data: { data: doc },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: { data: doc },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query =  Model.findById(req.params.id)
    const doc = await Model.findById(req.params.id).populate("reviews");
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
