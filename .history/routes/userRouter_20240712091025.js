const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const upload = multer({ dest: "public/img/users" });
const multer = require("multer");
const router = express.Router();
router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);
router.get("/logout", authController.logOut);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

router.use(authController.protect);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", upload.single("photo"), userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("admin"));
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
