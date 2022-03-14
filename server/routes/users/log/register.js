const express = require("express");
const router = express.Router();
const { User } = require("../../../models");
const bcrypt = require("bcrypt");

// router.post("/", async (req, res) => {
//   try {
//     const exUser = await User.findOne({
//       where: {
//         address: req.body.address,
//       },
//     });

//     if (exUser) {
//       return res.json({ success: false, message: "Address already exists, Please check again." });
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password, 12);

//     await User.create({
//       address: req.body.address,
//       password: hashedPassword,
//       nationality: req.body.nationality,
//       favorite: req.body.favorite,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "sucessfully registered",
//     });
//   } catch (error) {
//     return res.json({ success: false, message: error });
//   }
// });

router.post('/', async (req, res) => {
  try {
    const exUser = await User.findOne({
      where: {
        publicAddress: req.body.publicAddress,
      },
    });

    if (exUser) {
      return res.json({ success: false, message: "Address already exists, Please check again." });
    }

    await User.create({
      publicAddress: req.body.publicAddress,
      userName: req.body.userName,
    });

    return res.status(200).json({
      success: true,
      message: "Sucessfully registered",
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }

})

module.exports = router;
