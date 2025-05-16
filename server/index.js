const express = require("express");
const dotenv = require("dotenv");
const summarizeRoutes = require("./routes/summarizeRoute");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/summarize", summarizeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
