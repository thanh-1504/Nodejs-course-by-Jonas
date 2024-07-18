const Tour = require("../models/tourModel");
const catchAsync = require("../ultils/catchAsync");
exports.getOverview = catchAsync(async (req, res) => {
    
  res.status(200).render("overview", {
    title: "All Tours",
  });
});

exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "The Park Camper",
  });
};
