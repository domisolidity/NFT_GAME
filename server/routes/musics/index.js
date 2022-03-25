const express = require("express");
const router = express.Router();

const auction = require("./auction/music");
const test = require("./auction/test");
const membership = require("./membership/membership");

router.use("/auction", auction);
router.use("/test", test);

router.use("/membership", membership);

module.exports = router;
