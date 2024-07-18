const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  rating: Number,
  createdAt: Date,
  
});
