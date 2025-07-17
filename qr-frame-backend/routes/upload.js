// routes/upload.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Upload = require("../models/Upload");

const router = express.Router();
const uploadFolder = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);

    const existingFiles = fs.readdirSync(uploadFolder);
    const matchingFiles = existingFiles.filter(f =>
      f === `${baseName}${ext}` || f === `${baseName}(1)${ext}` || f === `${baseName}(2)${ext}`
    );

    if (matchingFiles.length >= 3) {
      return cb(new Error("You can only upload a maximum of 3 versions of the same image."));
    }

    let finalName = `${baseName}${ext}`;
    if (matchingFiles.includes(finalName)) {
      finalName = `${baseName}(1)${ext}`;
      if (matchingFiles.includes(finalName)) {
        finalName = `${baseName}(2)${ext}`;
      }
    }

    cb(null, finalName);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const filepath = `/uploads/${req.file.filename}`; // or relative to your frontend/public
    const newUpload = new Upload({
      filename: req.file.filename,
      filepath: filepath,
    });
    await newUpload.save();

    res.status(200).json({
      message: "Image uploaded and saved to DB successfully",
      file: newUpload,
    });
  } catch (err) {
    res.status(500).json({ error: "Error saving to DB" });
  }
});

module.exports = router;
