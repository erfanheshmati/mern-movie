const express = require("express");
const {
  createActor,
  updateActor,
  removeActor,
} = require("../controllers/actorController");
const uploadImage = require("../middlewares/multer");
const { actorInfoValidator, validate } = require("../middlewares/validator");

const router = express.Router();

router.post(
  "/create",
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);
router.post(
  "/update/:actorId",
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  updateActor
);
router.delete("/delete/:actorId", removeActor);

module.exports = router;
