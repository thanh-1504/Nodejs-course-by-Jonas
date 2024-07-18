const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    required: [true, "Booking must belong to a tour"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a user"],
  },
});
const Booking = mongoose.model("Booking",bookingSchema);
module.exports = Booking;
