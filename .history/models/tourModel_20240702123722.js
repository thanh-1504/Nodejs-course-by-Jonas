const mongoose = require("mongoose");
const slug = require("slugify");
const User = require("./userModel");
// const validator = require("validator");
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "A tour must have a name"], // is validator
      maxlength: [40, "A tour name must have less or equal then 40 characters"],
      minlength: [10, "A tour name must have more or equal then 10 characters"],
      unique: true, // is not validator
      trim: true,
      // validate: [validator.isAlpha, "Tour name must only contain characters"], // validate sử dụng thư viện validator
    },
    slug: String,
    duration: {
      type: String,
      require: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      require: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      require: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1"],
      max: [5, "Rating must be below 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: { type: Number, require: [true, "A tour must have a price"] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "Price discount ({VALUE}) must be lower than price",
      },
    },
    summary: {
      type: String,
      trim: true,
      require: [true, "A tour must have a summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      require: [true, "A tour must have a image cover"],
    },
    image: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [String],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    // guides: Array,
    guides: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual sẽ không dc lưu trên db do đó không nên query đối với virtual
tourSchema.virtual("durationWeek").get(function () {
  return this.duration / 7;
});

tourSchema.virtual('reviews', function() {
  
})

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });
  next();
});

// Document middleware: sẽ được excute trước khi save() or create()
// Ngoài save và create trên thì document middleware sẽ không dc excute
// tourSchema.pre("save", function (next) {
//   this.slug = slug(this.name, { lower: true });
//   next();
// });
// tourSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });

// Query middleware: sẽ dc excute khi ta thực hiện hành động truy vấn
// Chúng ta nên sử dụng /^find/ để fnc sẽ dc excute với tất cả event find
// tourSchema.pre("find", function (next) {
// tourSchema.pre(/^find/, function (next) {
//   this.find({ secretTour: { $ne: true } });
//   this.start = Date.now();
//   next();
// });

// tourSchema.post("find", function (docs, next) {
// tourSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} miliseconds`);
//   console.log(docs);
//   next();
// });

// Aggregate middleware
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

// tourSchema.pre("save", async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });
const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
