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

router.post('/', upload.array('image'), (req, res) => {
  res.json(req.files.map(v => v.location));

});

module.exports = router;