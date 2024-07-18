const catchAsync = require("../ultils/catchAsync");
exports.deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) throw new AppError("No document found with that ID",404);
    res.status(204).json({
      status: "success",
      message: "delete successful",
    });
  });
