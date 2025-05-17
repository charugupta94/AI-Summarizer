const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiSummary = async (text) => {
  const prompt = `
You are a helpful assistant. Create a cheat sheet from the following text. Focus on extracting key concepts, definitions, formulas, and important takeaways in a clear, organized, and concise format. Use bullet points, headings, or numbered lists if necessary for better readability.
Text:
"""${text}"""
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const summary = response.text();

  return summary || "No summary returned.";
};

module.exports = { getGeminiSummary };
