const nodemailer = require("nodemailer");

exports.generateOTP = () => {
  // generate 6 digit random OTP
  let OTP = "";
  for (let i = 0; i <= 5; i++) {
    const randomValue = Math.round(Math.random() * 9);
    OTP += randomValue;
  }
  return OTP;
};

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
