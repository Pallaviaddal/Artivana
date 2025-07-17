const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
; // Replace with env var in real apps

// Only one admin
const adminEmail = "pallaviaddala27@gmail.com";
const adminPassword = "Palluanu@123";

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check email
  if (email !== adminEmail) {
    return res.status(403).json({ message: "Only admin can login" });
  }

  // Check password
  if (password !== adminPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Create token
  const token = jwt.sign({ role: "admin", email },process.env.JWT_SECRET, { expiresIn: "1d" });

  return res.status(200).json({
    message: "Admin login successful",
    token,
    user: {
      email,
      role: "admin",
    },
  });
});

module.exports = router;
