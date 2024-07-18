const Tour = require("../models/tourModel");
exports.createTour = async (req, res) => {
  Tour.create(req.body);
};
