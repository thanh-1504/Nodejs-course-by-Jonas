const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  rating: Number,
  createdAt: Date,
  testRef: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
    },
  ],
  testRef2: [
    {type: mongoose.Schema}
  ]
});
