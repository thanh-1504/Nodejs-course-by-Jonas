const Tour = require("../models/tourModel");
exports.createTour = async (req, res) => {
  try {
    const tour  = await Tour.create(req.body);

  } catch(err)  {
    res.status(400).json({
      status:"fail",
      message: err
    })
  }

};
