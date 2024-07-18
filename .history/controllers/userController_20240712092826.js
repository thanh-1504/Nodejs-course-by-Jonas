const multer = require("multer");
const User = require("../models/userModel");
const AppError = require("../ultils/appError");
const catchAsync = require("../ultils/catchAsync");
const factory = require("./handlerFactory");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1]; // Lấy phần đuôi ảnh của file ở đây là JPG
    cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError("Not an image! Please upload only images", 400),false);
};

const upload = multer({
  
});

exports.updateUserPhoto = upload.single("photo");
const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// exports.getAllUsers = catchAsync(async (req, res) => {
//   const users = await User.find();
//   res.status(200).json({
//     status: "success",
//     result: users.length,
//     data: users,
//   });
// });
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  if (req.body.password || req.body.passwordConfirm)
    throw new AppError("This route is not update password", 400);
  const filterData = filterObj(req.body, "name", "email");
  const updateDataUser = await User.findByIdAndUpdate(req.user.id, filterData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updateDataUser,
    },
  });
  next();
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
  next();
});
