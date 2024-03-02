const { isValidObjectId } = require("mongoose");
const Actor = require("../models/actorModel");
const { sendError } = require("../utils/helper");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  // secure: true,
});

exports.createActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;

  const newActor = new Actor({ name, about, gender });
  if (file) {
    const uploadRes = await cloudinary.uploader.upload(file.path, {
      gravity: "face",
      height: 500,
      width: 500,
      crop: "thumb",
    });
    newActor.avatar = {
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
    };
  }
  await newActor.save();
  res.status(201).json({
    id: newActor._id,
    name: newActor.name,
    about: newActor.about,
    gender: newActor.gender,
    avatar: newActor.avatar?.url,
  });
};

exports.updateActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const { actorId } = req.params;

  if (!isValidObjectId(actorId)) return sendError(res, 401, "Invalid Request");

  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, 404, "Actor not found");

  const public_id = actor.avatar?.public_id;
  if (public_id && file) {
    const uploadRes = await cloudinary.uploader.destroy(public_id);
    if (uploadRes.result !== "ok")
      return sendError(res, 401, "Could not delete image from cloud");
  }

  if (file) {
    const uploadRes = await cloudinary.uploader.upload(file.path, {
      gravity: "face",
      height: 500,
      width: 500,
      crop: "thumb",
    });
    actor.avatar = {
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
    };
  }

  actor.name = name;
  actor.about = about;
  actor.gender = gender;
  await actor.save();

  res.status(201).json({
    id: actor._id,
    name: actor.name,
    about: actor.about,
    gender: actor.gender,
    avatar: actor.avatar?.url,
  });
};

exports.removeActor = async (req, res) => {
  const { actorId } = req.params;

  if (!isValidObjectId(actorId)) return sendError(res, 401, "Invalid Request");

  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, 404, "Actor not found");

  const public_id = actor.avatar?.public_id;
  if (public_id) {
    const uploadRes = await cloudinary.uploader.destroy(public_id);
    if (uploadRes.result !== "ok")
      return sendError(res, 401, "Could not delete image from cloud");
  }

  await Actor.findByIdAndDelete(actorId);

  res.status(201).json({
    message: "Actor deleted successfully",
  });
};
