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
      Generate a comprehensive and visually structured cheat sheet from the provided PDF document, ensuring clarity and engagement in the summary.Instructions: 1.**Summary** Provide a concise overview of the main themes and objectives of the document, highlighting key points.2.**Formulas** Include any relevant mathematical or logical formulas, along with brief explanations of their significance or application (e.g., fuzzy matching, Levenshtein distance).3.**Diagrams (Description or Regenerated)** - Describe each diagram's purpose and relevance within the document context.- If feasible, regenerate the diagram or create a simple visual representation based on the original content.- Assign clear and meaningful labels to diagrams (e.g., "Level 0 DFD - Context Diagram").4.**Key Takeaways** - Clearly enumerate major concepts, constraints, assumptions, and user roles using numbered points or dashes for easy readability.Output format: Ensure all information is presented in a clean Markdown-style format without asterisks, maintaining a professional and organized appearance throughout.
`
    },
  ]);

  const response = await result.response;
  return response.text() || "No summary returned.";
};


module.exports = { getGeminiSummaryFromPDF };
