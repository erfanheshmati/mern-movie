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

const router = express.Router();

router.post("/create", userValidator, validate, createUser);
router.post("/verify-email/:id", verifyEmail);
router.post("/verify-email/resend/:id", resendVerifyEmail);
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

module.exports = router;
