const express = require("express");
const router = express.Router();

const users = require("./users");
const profile = require("./profile");
const uploadImage = require("./uploadImage");

/* 사용자 로그 */
router.use("/", users);

/* 사용자 프로필 */
router.use("/profile", profile);

router.use("/uploadImage", uploadImage);

module.exports = router;
