exports.deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "delete successful",
    });
  });
