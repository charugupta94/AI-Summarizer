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
      text: `
      Summarize the content of the uploaded PDF into a professional, print-ready cheat sheet. Follow these exact guidelines:

Do not use any special formatting characters or symbols such as *, #, -, backticks, or markdown syntax. Avoid decorative elements entirely.

Use plain, clean formatting with proper spacing, indentation, and capitalization suitable for a professional PDF document.

Structure the summary with clear section titles, subheadings, and bullet points (use plain text bullets like "•" or indentation — not symbols like * or -).

Keep the text concise, skimmable, and logically organized — ideal for revision or quick reference.

Focus only on key takeaways, definitions, formulas (if relevant), and important concepts. Remove any filler, repetitive examples, or unnecessary details.

The final output must look like a high-quality academic or professional cheat sheet — something you'd confidently hand out to students or colleagues.
      `
    },
  ]);

  const response = await result.response;
  return response.text() || "No summary returned.";
};


module.exports = { getGeminiSummaryFromPDF };
