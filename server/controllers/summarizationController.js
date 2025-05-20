const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const { getGeminiSummary, getGeminiSummaryFromPDF } = require("../utils/geminiClient");
const { saveAsText, saveAsPDF } = require("../utils/saveSummary");
const upload = multer({ dest: "uploads/" });
const Summary = require("../models/Summary");


const pdfSummary = [
  authMiddleware, upload.single("pdf"), async (req, res) =>{
    try {
        const pdfBuffer = fs.readFileSync(req.file.path);
        const summary = await getGeminiSummaryFromPDF(pdfBuffer);

        const newSummary = new Summary({
          text: summary,
          userId: req.user._id 
        });
        await newSummary.save();
    
        const wordCount = summary.split(/\s+/).filter(Boolean).length;
        const wordsPerMinute = 200;
        const readingTimeInSeconds = Math.ceil((wordCount / wordsPerMinute) * 60);
        fs.unlinkSync(req.file.path);
    
        res.json({
          summary,
          wordCount,
          estimatedReadingTime: `${readingTimeInSeconds} sec`,
          summaryId: newSummary._id,
        });
    
      } catch (error) {
        console.error("Gemini PDF summarization error:", error);
        res.status(500).json({ error: "Failed to summarize the PDF" });
      }
  }
];

const downloadSummary = async(req,res)=>{
  const { summary, format } = req.body;
  
    if (!summary || !format) {
      return res.status(400).json({ error: "Summary and format are required" });
    }
  
    const fileName = `summary-${Date.now()}`;
  
    try {    let filePath;
      if (format === "pdf") {
        filePath = saveAsPDF(summary, fileName);
      } else if (format === "txt") {
        filePath = saveAsText(summary, fileName);
      } else {
        return res.status(400).json({ error: "Unsupported file format" });
      }
  
      res.download(filePath, (err) => {
        if (err) {
          console.log("File succesfully downloaded");
          res.status(200).send("File Successfully Downloaded");
        }
      });
    } catch (error) {
      console.error("Download failed:", error);
      res.status(500).json({ error: "Failed to generate download" });
    }
};


module.exports = { pdfSummary , downloadSummary};