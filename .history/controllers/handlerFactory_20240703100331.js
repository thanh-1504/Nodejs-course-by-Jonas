const catchAsync = require("../ultils/catchAsync");
exports.deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "delete successful",
    });
  });
