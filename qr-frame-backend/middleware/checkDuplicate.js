const fs = require("fs");
const path = require("path");

const checkDuplicateImageLimit = (req, res, next) => {
  const uploadsDir = path.join(__dirname, "../uploads");

  fs.readdir(uploadsDir, (err, files) => {
    if (err) return res.status(500).json({ message: "Error reading upload directory" });

    const uploadedFileName = req.file.originalname;

    // Count all files with same name (including copies like copy- or numbered versions)
    const baseName = uploadedFileName.split(".")[0];
    const duplicates = files.filter(file => file.startsWith(baseName));

    if (duplicates.length >= 2) {
      // Delete the just-uploaded temp file (Multer saved it before this middleware)
      fs.unlink(req.file.path, () => {
        return res.status(400).json({ message: "You can only upload a maximum of 2 copies of the same image." });
      });
    } else {
      next(); // Less than 2 matches, proceed
    }
  });
};

module.exports = checkDuplicateImageLimit;
