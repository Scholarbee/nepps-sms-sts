const router = require("express").Router();
const {
  login,
  logout,
  loginStatus,
  changePassword,
  forgotPassword,
  resetPassword,
  unblockUser,
  blockUser,
  getUser,
} = require("../controllers/userController");
const { userInfo } = require("../middlewares/authMiddleware");

router.put("/block-user/:id", blockUser);
router.put("/unblock-user/:id", userInfo, unblockUser);

// Auth
router.post("/login", login);
router.get("/logout", logout);
router.get("/login-status/:userToken", loginStatus);
router.get("/user-info", userInfo, getUser);

router.post("/change-password", userInfo, changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

module.exports = router;
