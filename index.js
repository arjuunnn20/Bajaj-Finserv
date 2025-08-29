const express = require("express");
const app = express();
app.use(express.json());

// --- Environment Variables ---
const FULL_NAME_LOWERCASE = process.env.FULL_NAME_LOWERCASE || "your_full_name_in_lowercase";
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "ddmmyyyy";
const EMAIL = process.env.EMAIL || "you@example.com";
const ROLL_NUMBER = process.env.ROLL_NUMBER || "YOURROLL123";

// --- Reusable Failure Response ---
const getFailureResponse = () => ({
  is_success: false,
  // ✅ FIX: Using template literal (backticks)
  user_id: ${FULL_NAME_LOWERCASE}_${DOB_DDMMYYYY},
  email: EMAIL,
  roll_number: ROLL_NUMBER,
  // Default empty values
  odd_numbers: [],
  even_numbers: [],
  alphabets: [],
});

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body && Array.isArray(req.body.data) ? req.body.data : null;

    if (!data) {
      // ✅ FIX: Returning 400 for bad request
      return res.status(400).json(getFailureResponse());
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];

    for (const item of data) {
      // Coerce to string for consistent checking
      const s = String(item);
      
      if (!isNaN(s) && !isNaN(parseFloat(s))) { // A more robust number check
        if (Number(s) % 2 === 0) {
          even_numbers.push(s);
        } else {
          odd_numbers.push(s);
        }
      } else if (/^[A-Za-z]+$/.test(s)) {
        alphabets.push(s.toUpperCase());
      }
      // Note: Items with both letters and numbers will be ignored here.
    }

    res.status(200).json({
      is_success: true,
      // ✅ FIX: Using template literal (backticks)
      user_id: ${FULL_NAME_LOWERCASE}_${DOB_DDMMYYYY},
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
    });
  } catch (error) {
    // ✅ FIX: Logging the error for debugging
    console.error("Error processing /bfhl request:", error);
    
    // ✅ FIX: Returning 500 for internal server error
    res.status(500).json(getFailureResponse());
  }
});

app.get("/", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
