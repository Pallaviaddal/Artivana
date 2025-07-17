// src/utils/translate.js

import axios from "axios";

export const translateText = async (text, targetLang) => {
  try {
    const res = await axios.post("http://localhost:5000/api/translate", {
      text,
      target: targetLang,
    });
    return res.data.translatedText;
  } catch (err) {
    console.error("Translation error:", err);
    return "";
  }
};
