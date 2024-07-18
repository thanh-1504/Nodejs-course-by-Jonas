const Tour = require("../models/tourModel");
const APIFeatures = require("../ultils/apiFeature");
const AppError = require("../ultils/appError");
const catchAsync = require("../ultils/catchAsync");
const factory = require("./handlerFactory");
// Create Tour
// exports.createTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.create(req.body);
//   res.status(201).json({
//     status: "success",
//     data: tour,
//   });
// });

// Alias tour
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

// exports.getTours = catchAsync(async (req, res, next) => {
//   // Excute Query
//   const feature = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .fields()
//     .paginate();
//   const tours = await feature.query;
//   // Send Response
//   res.status(200).json({
//     status: "success",
//     result: tours.length,
//     data: tours,
//   });
// });

// exports.getTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.id).populate("reviews");
//   // Tour.findOne({_id: req.params.id}) // Bản chất là mongo sẽ sử dụng cái này nhưng để tiện cho dev nên sinh ra findID
//   res.status(200).json({
//     status: "success",
//     data: tour,
//   });
// });

exports.getTourStats = catchAsync(async (req, res) => {
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
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = +req.params.year;
  const plan = await Tour.aggregate([
    { $unwind: "$startDates" },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`).toISOString(),
          $lte: new Date(`${year}-12-31`).toISOString(),
        },
      },
    },
    {
      $group: {
        _id: { $month: { $dateFromString: { dateString: "$startDates" } } },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    { $project: { _id: 0 } },
    { $sort: { numTourStarts: -1 } },
    { $limit: 5 },
  ]);
  res.status(200).json({
    status: "success",
    result: plan.length,
    data: plan,
  });
});

// /tours-within/:distance/center/:latlng/unit/:unit
// /tours-within/233/center/-40,45/unit/mi
exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");
  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng)
    throw new AppError(
      "Please provide latitutr and longgitude in the format lat,lng.",
      400
    );
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      data: tours,
    },
  });
});

// "/distance/:latlng/unit/:unit"
exports.getDistance = catchAsync(async (req,res,next) => {
  const {latlng,unit} = req.params;
  const [lat,lng] = latlng.split(",");
  if (!lat || !lng) throw new AppError("Please provide latitutr and longgitude in the format lat,lng.")
})
// exports.updateTour = catchAsync(async (req, res) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json({
//     status: "success",
//     tour: tour,
//   });
// });

// exports.deleteTour = catchAsync(async (req, res) => {
//   await Tour.findByIdAndDelete(req.params.id);
//   res.status(204).json({
//     status: "success",
//     message: "delete successful",
//   });
// });
exports.getTour = factory.getOne(Tour, "reviews");
exports.getTours = factory.getAll(Tour);
exports.createTour = factory.createOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
exports.updateTour = factory.updateOne(Tour);
