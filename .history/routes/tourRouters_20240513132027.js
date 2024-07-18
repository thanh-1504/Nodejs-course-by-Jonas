const fs = require("fs");
const express = require("express");
const router = express.Router();
// read Data
const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/toursData-simple.json`)
);
const getAlltoursData = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    result: toursData.length,
    data: toursData,
  });
};
const getATour = (req, res) => {
  const tour = toursData.find((el) => el.id === +req.params.id);
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
  const newID = toursData[toursData.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  toursData.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/toursData-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { tour: newTour },
      });
    }
  );
};
const updateTour = (req, res) => {
  if (+req.params.id > toursData.length) {
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
  if (+req.params > toursData.length) {
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

router.route("/").get(getAlltoursData).post(createTour);
router.route("/:id").get(getATour).patch(updateTour).delete(deleteTour);
module.exports = router;
