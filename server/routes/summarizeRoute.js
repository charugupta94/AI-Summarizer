const express = require("express");
const multer = require("multer");  //it is used to handle file uploads
const pdfParse = require("pdf-parse"); // it is used to extract the text from pdf
const fs = require("fs");
const path = require("path");
const { getGeminiSummary } = require("../utils/geminiClient");

const router = express.Router();

const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");

const {pdfSummary , downloadSummary} = require("../controllers/summarizationController.js");

router.post("/uploadpdf", pdfSummary);
router.post("/download-summary", downloadSummary);

module.exports = router;
