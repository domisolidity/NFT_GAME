const express = require("express");
const router = express.Router();

router.get("/auth", (req, res) => {
  console.log(req.user);
  res.status(200).json({
    id: req.user.id,
    address: req.user.address,
    nationality: req.user.nationality,
    favorite: req.user.favorite,
    isAuth: true,
  });
});

module.exports = router;
