const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");

const downloadDir = path.join(__dirname, "../downloads");

// Ensure the downloads directory exists
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

function saveAsText(summary, fileName) {
  const filePath = path.join(downloadDir, `${fileName}.txt`);
  fs.writeFileSync(filePath, summary);
  return filePath;
}

function saveAsPDF(summary, fileName) {
  const filePath = path.join(downloadDir, `${fileName}.pdf`);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));
  doc.text(summary);
  doc.end();

  return filePath;
}

module.exports = { saveAsText, saveAsPDF };
