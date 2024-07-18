const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: "Tour",
        required: [true, '']
    }
})