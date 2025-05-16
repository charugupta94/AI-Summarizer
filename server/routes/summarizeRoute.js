const express = require("express");
const router = express.Router();
const { handleSummarize } = require("../controllers/summarizeController");

router.post("/", handleSummarize);

module.exports = router;
