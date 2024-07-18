const fs = require("fs");
const express = require("express");
const router = express.Router();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: tours,
  });
};
const getATour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
  res.status(200).json({
    status: "success",
    tour,
  });
};
const createTour = (req, res) => {
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
const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
  res.status(200).json({
    status: "success",
    tour: "Updated tour here",
  });
};
const deleteTour = (req, res) => {
  if (+req.params > tours.length) {
    res.status(404).json({
      status: "fail",
      message: "ID invalid",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
module.exports = router