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

    const wordCount = summary.split(/\s+/).filter(Boolean).length;
    const wordsPerMinute = 200;
    const readingTimeInSeconds = Math.ceil((wordCount / wordsPerMinute) * 60);
    // const minutes = Math.floor(readingTimeInSeconds / 60);
    // const seconds = readingTimeInSeconds % 60;

    fs.unlinkSync(req.file.path);

    res.json({
      summary,
      wordCount,
      estimatedReadingTime: `${readingTimeInSeconds} sec`
    });

  } catch (error) {
    console.error("Gemini PDF summarization error:", error);
    res.status(500).json({ error: "Failed to summarize the PDF" });
  }
});

module.exports = router;
