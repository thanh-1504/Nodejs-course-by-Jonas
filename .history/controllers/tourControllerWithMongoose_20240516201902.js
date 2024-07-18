const Tour = require("../models/tourModel");
exports.createTour = async (req, res) => {
  const Tour.create(req.body);
};
