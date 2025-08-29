const express = require("express");
const app = express();
app.use(express.json());

const FULL_NAME_LOWERCASE = process.env.FULL_NAME_LOWERCASE || "your_full_name_in_lowercase";
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "ddmmyyyy";
const EMAIL = process.env.EMAIL || "you@example.com";
const ROLL_NUMBER = process.env.ROLL_NUMBER || "YOURROLL123";

app.post("/bfhl", (req, res) => {
  try {
    const input = req.body && Array.isArray(req.body.data) ? req.body.data : null;
    if (!input) {
      return res.status(200).json({
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
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    const letters = [];
    let sum = 0n;

    for (const item of input) {
      const s = String(item);
      if (/^[0-9]+$/.test(s)) {
        const n = BigInt(s);
        sum += n;
        if (n % 2n === 0n) even_numbers.push(s);
        else odd_numbers.push(s);
      } else if (/^[A-Za-z]+$/.test(s)) {
        alphabets.push(s.toUpperCase());
        for (const ch of s) letters.push(ch);
      } else {
        special_characters.push(s);
      }
    }

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
  } catch {
    res.status(200).json({
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
  }
});

app.get("/", (req, res) => res.send("OK"));
const PORT = process.env.PORT || 3000;
app.listen(PORT);

