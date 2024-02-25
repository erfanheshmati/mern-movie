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
      user: "189c028f781152",
      pass: process.env.MAILTRAP_PASS,
    },
  });
