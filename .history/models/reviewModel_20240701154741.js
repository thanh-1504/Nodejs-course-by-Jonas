const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review can not be empty"],
  },
  rating: {
    type: Number
  }
  createdAt: Date,
  testRef: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
    },
  ],
  testRef2: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});
