const express = require("express");
const path = require("path");
const { isValidRollNo, getResult } = require("./lib");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/api/result/:rollNo", (req, res) => {
  const { rollNo } = req.params;
  if (!isValidRollNo(rollNo)) {
    return res.status(400).json({ error: "Roll number must be 12 digits" });
  }
  const result = getResult(rollNo);
  if (!result) return res.status(404).json({ error: "Result not found" });
  res.json(result);
});

module.exports = app;
