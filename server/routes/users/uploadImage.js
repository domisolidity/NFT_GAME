const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require('multer-s3');
const path = require("path");
const AWS = require('aws-sdk');
const fs = require('fs');

require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'doremifa',
    key(req, file, cb) {
      cb(null, `profile/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
})
// /* 이미지 미리보기 */
// router.post("/", (req, res) => {
//   console.log(123)
//   upload(req, res, (err) => {
//     if (err) return res.json({ success: false, err });
//     return res.json({
//       success: true,
//       image: res.req.file.path,
//       fileName: res.req.file.filename,
//     });
//   });
// });

// router.post('/', upload.array("uploadedImages", 5), async (req, res) => {
//   try {
//     console.log(req.body);
//     console.log("file ::: ", req.files);
//     // const { metamask, name, nationality, img, pass } = req.body;

//     // await User.update(
//     //   {
//     //     name,
//     //     nationality,
//     //     img,
//     //     pass,
//     //   },
//     //   {
//     //     where: { metamask },
//     //   },
//     // );

//     // const UserInfo = await User.findOne({
//     //   where: { metamask },
//     //   attributes: {
//     //     exclude: ['id', 'updatedAt', 'deletedAt'],
//     //   },
//     //   include: {
//     //     model: Genre,
//     //     attribute: ['content'],
//     //   },
//     // });


//   } catch (error) {
//     console.error(error);
//   }
// });

/* 이미지 미리보기 */
router.post('/', upload.array('image'), (req, res) => {
  console.log('다사다난', req.files);
  res.json(req.files.map(v => v.location));

});

module.exports = router;