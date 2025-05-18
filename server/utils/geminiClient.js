const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiSummaryFromPDF = async (pdfBuffer) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "application/pdf",
        data: pdfBuffer.toString("base64"), 
      },
    },
    {
      text: "Summarize this PDF and create a cheat sheet from both the text and image content. Include: -Important formulas - Key diagrams (mention what they represent) - Bullet points of all major concepts Output format: 1. Summary 2. Formulas 3. Diagrams (description) 4. Key Takeaways Return only formatted text output",
    },
  ]);

  const response = await result.response;
  return response.text() || "No summary returned.";
};


module.exports = { getGeminiSummaryFromPDF };
