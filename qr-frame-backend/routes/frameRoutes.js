const express = require('express');
const router = express.Router();
const multer = require('multer');
const Frame = require('../models/Frame');
const { translateText } = require("../utils/translate");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });
const multiUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'audio', maxCount: 1 },
]);

// ✅ POST new frame
router.post('/', multiUpload, async (req, res) => {
  try {
    const { name, price, title, category, description } = req.body;
    const description_hi = await translateText(description, "hi");
    const description_te = await translateText(description, "te");

    const frame = new Frame({
      name,
      price,
      title,
      category,
      description,
      description_hi,
      description_te,
      image: req.files?.image?.[0]?.filename,
      video: req.files?.video?.[0]?.filename,
      audio: req.files?.audio?.[0]?.filename,
    });

    await frame.save();
    res.status(201).json({ message: "Frame uploaded", frame });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

router.get('/', async (req, res) => {
  try {
    const frames = await Frame.find();
    res.json(frames);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch frames" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Frame.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted frame" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;