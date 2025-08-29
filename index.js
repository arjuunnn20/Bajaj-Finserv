const express = require("express");
const app = express();
app.use(express.json());

// --- Environment Variables ---
const FULL_NAME_LOWERCASE = process.env.FULL_NAME_LOWERCASE || "john_doe";
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "17091999";
const EMAIL = process.env.EMAIL || "john@xyz.com";
const ROLL_NUMBER = process.env.ROLL_NUMBER || "ABCD123";

// --- Failure Response Template ---
const getFailureResponse = () => ({
  is_success: false,
  user_id: `${FULL_NAME_LOWERCASE}_${DOB_DDMMYYYY}`,
  email: EMAIL,
  roll_number: ROLL_NUMBER,
  odd_numbers: [],
  even_numbers: [],
  alphabets: [],
  special_characters: [],
  sum: "0",
  concat_string: ""
});

// --- POST /bfhl ---
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body && Array.isArray(req.body.data) ? req.body.data : null;

    if (!data) {
      return res.status(200).json(getFailureResponse());
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    const letters = [];
    let sum = 0n;

    for (const item of data) {
      const s = String(item);

      if (/^[0-9]+$/.test(s)) {
        const n = BigInt(s);
        sum += n;
        if (n % 2n === 0n) {
          even_numbers.push(s);
        } else {
          odd_numbers.push(s);
        }
      } else if (/^[A-Za-z]+$/.test(s)) {
        alphabets.push(s.toUpperCase());
        for (const ch of s) letters.push(ch);
      } else {
        special_characters.push(s);
      }
    }

    // Build concat_string (reverse + alternating case)
    letters.reverse();
    const out = [];
    for (let i = 0; i < letters.length; i++) {
      const ch = letters[i];
      out.push(i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase());
    }

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME_LOWERCASE}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: out.join("")
    });
  } catch (error) {
    console.error("Error in /bfhl:", error);
    res.status(500).json(getFailureResponse());
  }
});

app.get("/", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
