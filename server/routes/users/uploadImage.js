const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");


/* 이미지 파일 이름 지정 */
const box = multer.diskStorage({
  destination(req, file, done) {
    done(null, "uploads");
  },
  filename(req, file, done) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    done(null, basename + "_" + new Date().getTime() + ext);
  },
});

const upload = multer({ storage: box }).single("file");

/* 이미지 미리보기 */
router.post("/", (req, res) => {
  console.log(123)
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
