const express = require("express");
const axios = require("axios");
const router = express.Router();

// POST /api/translate
router.post("/", async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const response = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source: "en",
      target: targetLang,
      format: "text"
    }, {
      headers: { "Content-Type": "application/json" }
    });

    res.json({ translated: response.data.translatedText });
  } catch (error) {
    console.error("🔴 Translation error:", error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

module.exports = router;
