const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  console.log("auction/music");
});

module.exports = router;
