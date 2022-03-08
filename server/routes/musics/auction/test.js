const express = require("express");
const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log("auction/test");
});

module.exports = router;
