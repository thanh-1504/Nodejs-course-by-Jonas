const Tour = require("../models/tourModel");
const catchAsync = require("../ultils/catchAsync");
exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();
  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});

exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "The Park Camper",
  });
};
