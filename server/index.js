const express = require("express");
const dotenv = require("dotenv");
const summarizeRoutes = require("./routes/summarizeRoute");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(express.json());
connectDB();
const authRoutes = require("./routes/authRoute");
app.use("/api/auth", authRoutes);
app.use("/api/summarize", summarizeRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
