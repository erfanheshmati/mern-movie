const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");
const PasswordResetToken = require("../models/passwordResetTokenModel");
const bcrypt = require("bcryptjs");

exports.isValidPasswordResetToken = async (req, res, next) => {
  const { token, userId } = req.body;

  if (!token.trim() || !isValidObjectId(userId))
    return sendError(res, 401, "Invalid request");

  const passwordResetToken = await PasswordResetToken.findOne({
    owner: userId,
  });
  if (!passwordResetToken)
    return sendError(res, 401, "Unauthorized access, invalid request");

  const isMatched = bcrypt.compareSync(token, passwordResetToken.token);
  if (!isMatched)
    return sendError(res, 401, "Unauthorized access, invalid request");

  req.passwordResetToken = passwordResetToken;

  next();
};
