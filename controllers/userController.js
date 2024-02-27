const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const EmailVerifyToken = require("../models/emailVerifyTokenModel");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { isValidObjectId } = require("mongoose");
const { sendError, generateRandomByte } = require("../utils/helper");
const PasswordResetToken = require("../models/passwordResetTokenModel");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return sendError(res, 401, "User already exists");
  }
  // hash password
  const hashedPassword = bcrypt.hashSync(password, 10);
  // create new user
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  // generate 6 digit random OTP
  let OTP = generateOTP();
  // hash token
  const hashedToken = bcrypt.hashSync(OTP, 10);
  // create new email verify token
  const newEmailVerifyToken = new EmailVerifyToken({
    owner: newUser._id,
    token: hashedToken,
  });
  await newEmailVerifyToken.save();
  // generate email transporter
  const transport = generateMailTransporter();
  // send email to user
  transport.sendMail({
    from: "verification@movieapp.com",
    to: newUser.email,
    subject: "Email Verification",
    html: `
    <h2>Hi ${newUser.name}</h2>
    <h3>Your verification OTP:</h3>
    <h3>${OTP}</h3>
    `,
  });
  res.status(201).json({
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, 401, "Invalid user");

  const user = await User.findById(userId);
  if (!user) return sendError(res, 404, "User not found");

  if (user.isVerified) return sendError(res, 401, "User is already verified");

  const emailVerifyToken = await EmailVerifyToken.findOne({ owner: userId });
  if (!emailVerifyToken) return sendError(res, 404, "Token not found");

  const isMatched = bcrypt.compareSync(OTP, emailVerifyToken.token);
  if (!isMatched) return sendError(res, 401, "Invalid OTP");

  user.isVerified = true;
  await user.save();

  await EmailVerifyToken.findByIdAndDelete(emailVerifyToken._id);

  // generate email transporter
  const transport = generateMailTransporter();
  // send email to user
  transport.sendMail({
    from: "verification@movieapp.com",
    to: user.email,
    subject: "Welcome Email",
    html: `
    <h2>Welcome ${user.name}</h2>
    <h3>Your email is verified</h3>
    `,
  });
  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json(
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: jwtToken,
      },
    },
    { message: "Your email is verified" }
  );
};

exports.resendVerifyEmail = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, 404, "User not found");

  if (user.isVerified) return sendError(res, 401, "User is already verified");

  const alreadyHasToken = await EmailVerifyToken.findOne({ owner: userId });
  if (alreadyHasToken)
    return sendError(
      res,
      401,
      "Only after 2 minutes you can request for another token"
    );

  // generate 6 digit random OTP
  let OTP = generateOTP();
  // hash token
  const hashedToken = bcrypt.hashSync(OTP, 10);
  // create new email verify token
  const newEmailVerifyToken = new EmailVerifyToken({
    owner: user._id,
    token: hashedToken,
  });
  await newEmailVerifyToken.save();
  // generate email transporter
  const transport = generateMailTransporter();
  // send email to user
  transport.sendMail({
    from: "verification@movieapp.com",
    to: user.email,
    subject: "Email Verification",
    html: `
     <h2>Hi ${user.name}</h2>
     <h3>Your verification OTP:</h3>
     <h3>${OTP}</h3>
     `,
  });
  res.json({ message: "New token has been sent to your email" });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, 401, "Email is missing");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, 404, "User not found");

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return sendError(
      res,
      401,
      "Only after 2 minutes you can request for another token"
    );

  // generate long random token
  const token = await generateRandomByte();
  // hash token
  const hashedToken = bcrypt.hashSync(token, 10);
  // create new password reset token
  const newPasswordResetToken = new PasswordResetToken({
    owner: user._id,
    token: hashedToken,
  });
  await newPasswordResetToken.save();
  // reset password url
  const resetPasswordUrl = `http://localhost:5000/reset-password?token=${token}&id=${user._id}`;
  // generate email transporter
  const transport = generateMailTransporter();
  // send email to user
  transport.sendMail({
    from: "security@movieapp.com",
    to: user.email,
    subject: "Reset Password",
    html: `
       <h2>Hi ${user.name}</h2>
       <h3>Click here to reset your password:</h3>
       <a href="${resetPasswordUrl}">Change Password</a>
       `,
  });
  res.json({ message: "Password reset link has been sent to your email" });
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);

  const isMatched = bcrypt.compareSync(newPassword, user.password);
  if (isMatched)
    return sendError(
      res,
      401,
      "The new password must be different from the old one"
    );

  // hash new password and insert into the database
  user.password = bcrypt.hashSync(newPassword, 10);
  await user.save();
  // clear password token
  await PasswordResetToken.findByIdAndDelete(res.passwordResetToken._id);

  // generate email transporter
  const transport = generateMailTransporter();
  // send email to user
  transport.sendMail({
    from: "security@movieapp.com",
    to: user.email,
    subject: "Password Reset Successfully",
    html: `
         <h2>Hi ${user.name}</h2>
         <h3>Password Reset Successfully</h3>
         <h3>You can use your new password now</h3>
         `,
  });
  res.json({ message: "Password reset successfully" });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, 404, "User not found");
  }
  const isMatched = bcrypt.compareSync(password, user.password);
  if (!isMatched) {
    return sendError(res, 401, "Invalid password");
  }
  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: jwtToken,
  });
};
