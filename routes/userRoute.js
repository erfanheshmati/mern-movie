const express = require("express");
const {
  userValidator,
  validate,
  validatePassword,
  signInValidator,
} = require("../middlewares/validator");
const {
  createUser,
  verifyEmail,
  resendVerifyEmail,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  signIn,
} = require("../controllers/userController");
const { isValidPasswordResetToken } = require("../middlewares/user");
const { sendError } = require("../utils/helper");
const { isAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/create", userValidator, validate, createUser);
router.post("/verify-email", verifyEmail);
router.post("/verify-email/resend", resendVerifyEmail);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-password-reset-token",
  isValidPasswordResetToken,
  sendResetPasswordTokenStatus
);
router.post(
  "/reset-password",
  isValidPasswordResetToken,
  validatePassword,
  validate,
  resetPassword
);
router.post("/sign-in", signInValidator, validate, signIn);

router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({ user: { id: user._id, name: user.name, email: user.email } });
});

module.exports = router;
