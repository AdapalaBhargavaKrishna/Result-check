const results = require("./data/results.json");

// Roll number must be exactly 12 digits
function isValidRollNo(rollNo) {
  return typeof rollNo === "string" && /^\d{12}$/.test(rollNo.trim());
}

// Returns the result record or null if not found
function getResult(rollNo) {
  if (!isValidRollNo(rollNo)) return null;
  const key = rollNo.trim();
  return results[key] ? { rollNo: key, ...results[key] } : null;
}

module.exports = { isValidRollNo, getResult };
