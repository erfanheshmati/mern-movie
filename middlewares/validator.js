const { check, validationResult } = require("express-validator");

exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be 4 to 20 characters"),
];

exports.validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be 4 to 20 characters"),
];

exports.signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password").trim().not().isEmpty().withMessage("Password is missing"),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.status(400).json({ error: error[0].msg });
  }
  next();
};

exports.actorInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("about").trim().not().isEmpty().withMessage("About is required"),
  check("gender").trim().not().isEmpty().withMessage("Gender is required"),
];
