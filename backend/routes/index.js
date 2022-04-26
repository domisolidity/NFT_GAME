const express = require("express");
const router = express.Router();

const user = require("./users");
const auth = require("./auth");
const game = require("./games");
const item = require("./items");
const rank = require("./ranks");


router.use("/auth", auth);
router.use("/users", user);
router.use("/games", game);
router.use("/items", item);
router.use("/ranks", rank);

module.exports = router;
