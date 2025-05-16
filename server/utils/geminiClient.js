const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiSummary = async (text) => {
  const prompt = `
You are a helpful assistant. Summarize the following text clearly and concisely.

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
