const Tour = require("../models/tourModel");
exports.createTour = async (req, res) => {
  const tour  = await Tour.create(req.body);
};
