const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const catchAsync = require("../ultils/catchAsync");
const userSchema = new mongoose.Schema({
  name: { type: String, require: [true, "Please tell us your name"] },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // Chỉ hoạt động khi document được create or save ngoài ra update hay bất kể cái khác thì validate này sẽ kh chạy
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});
userSchema.pre("save", async function (next) {
  // Chỉ chạy fnc này nếu password được thay đổi
  if (!this.isModified("password")) return next();
  // Sử dụng hàm băm của thư viện bcrypt để mã hóa password với chi phí là 12
  this.password = await bcrypt.hash(this.password, 12);
  // Ẩn passwordConfirm trong db
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPassword = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimestamp > JWTTimestamp;
  }
  return false;
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// userSchema.methods.createResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//   console.log({ resetToken }, this.passwordResetToken);
//   return resetToken;
// };

userSchema.methods.createResetTokenPassword = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex");
  this.passwordr
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
