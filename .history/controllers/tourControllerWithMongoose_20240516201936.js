const Tour = require("../models/tourModel");
exports.createTour = async (req, res) => {
  try {
    const tour  = await Tour.create(req.body);

  } catch(err => {
    console.log(err)
  })

};
