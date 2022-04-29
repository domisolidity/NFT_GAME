const express = require("express");
const router = express.Router();

const users = require("./users");
const profile = require("./profile");
const uploadImage = require("./uploadImage");

router.use("/", users);
router.use("/profile", profile);
router.use("/uploadImage", uploadImage);

module.exports = router;
