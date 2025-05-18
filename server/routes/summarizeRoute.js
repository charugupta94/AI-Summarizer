const express = require("express");
const multer = require("multer");  //it is used to handle file uploads
const pdfParse = require("pdf-parse"); // it is used to extract the text from pdf
const fs = require("fs");
const path = require("path");
const { getGeminiSummary } = require("../utils/geminiClient");

const router = express.Router();

const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");

router.post("/upload",authMiddleware, upload.single("pdf"), async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const dataBuffer = fs.readFileSync(pdfPath);

    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    const summary = await getGeminiSummary(extractedText);

    fs.unlinkSync(pdfPath);

    res.json({ summary });
  } catch (error) {
    console.error("PDF summarization error:", error);
    res.status(500).json({ error: "Failed to summarize the PDF" });
  }
});

module.exports = router;
