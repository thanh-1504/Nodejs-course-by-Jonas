const Tour = require("../models/tourModel");
exports.createTour = (req, res) => {
  Tour.create(req.body)
};
