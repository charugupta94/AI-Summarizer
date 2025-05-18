const express = require("express");
const router = express.Router();
const { saveAsText, saveAsPDF } = require("../utils/saveSummary");

router.post("/download-summary", async (req, res) => {
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
        // console.error("Download error", err);
        // res.status(500).send("Error downloading the file.");
        console.log("File succesfully downloaded");
        res.status(200).send("File Successfully Downloaded");
      }
    });
  } catch (error) {
    console.error("Download failed:", error);
    res.status(500).json({ error: "Failed to generate download" });
  }
});

module.exports = router;
