const { getGeminiSummary } = require("../utils/geminiClient");

exports.handleSummarize = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required" });
    }

    const summary = await getGeminiSummary(text);
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
