const fs = require("fs");
// read Data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Handle check invalid id
exports.checkID = (req, res, next, value) => {
  console.log(`tour id is: ${value}`);
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
  next();
};

// Handle check data valid
exports.checkDataValid = (req,res,next,value) =>{
  
}
// Handle Routes
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: tours,
  });
};
exports.getATour = (req, res) => {
  // const tour = tours.find((el) => el.id === +req.params.id);
  // if (!tour) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: "ID invalid",
  //   });
  // }
  res.status(200).json({
    status: "success",
    tour,
  });
};
exports.createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { tour: newTour },
      });
    }
  );
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    tour: "Updated tour here",
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
