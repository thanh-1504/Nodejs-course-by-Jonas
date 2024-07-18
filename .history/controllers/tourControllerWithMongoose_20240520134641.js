const Tour = require("../models/tourModel");
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getTours = async (req, res) => {
  try {
    // 1. Build Query
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((elm) => delete queryObj[elm]);
    let query = Tour.find(queryObj);
    // 2 cách tương tự nhau
    // const query2 = Tour.find().where("duration").equals(5).where("difficult").equals("easy");
    // 2. Sorting
    if (req.query.sort) {
      // query = query.sort(req.query.sort); // sort theo price tăng dần
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else query = query.sort("-createdAt");

    // 3. Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else query = query.select("-__v");

    // 4. Pagination
    const page = +req.query.page;
    const limit = +req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error("Page is not exist");
    }
    // Excute Query
    const tours = await query;
    // Send Response
    res.status(200).json({
      status: "success",
      result: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id: req.params.id}) // Bản chất là mongo sẽ sử dụng cái này nhưng để tiện cho dev nên sinh ra findID
    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: "$difficulty",
          numTours: { $sum: 1 },
          numRating: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = +req.params.year;
    const plan = await Tour.aggregate([
      { $unwind: "$startDates" },
      { $match: { $gte: new Date(`${year}-01-01`),$lte: } },
    ]);
    res.status(200).json({
      status: "success",
      result: plan.length,
      data: plan,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      tour: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "delete successful",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
