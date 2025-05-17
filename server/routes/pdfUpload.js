const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { getGeminiSummaryFromPDF } = require("../utils/geminiClient");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(req.file.path);
    const summary = await getGeminiSummaryFromPDF(pdfBuffer);

    fs.unlinkSync(req.file.path);
    res.json({ summary });
  } catch (error) {
    console.error("Gemini PDF summarization error:", error);
    res.status(500).json({ error: "Failed to summarize the PDF" });
  }
});

module.exports = router;
