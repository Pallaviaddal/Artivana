// models/Upload.js
const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Upload", uploadSchema);
