const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");
const User = require("../models/userModel");

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;
  const jwtToken = token.split("Bearer ")[1];
  if (!jwtToken) return sendError(res, 401, "Invalid Token");
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { userId } = decode;
  const user = await User.findById(userId);
  if (!user) return sendError(res, 404, "User not found");
  req.user = user;
  next();
};
