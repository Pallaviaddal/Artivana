// src/utils/translate.js
import axios from "axios";

export const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post("http://localhost:5000/api/translate", {
      text,
      targetLang,
    });
    return response.data.translated;
  } catch (error) {
    console.error("Translation error:", error);
    return "";
  }
};
