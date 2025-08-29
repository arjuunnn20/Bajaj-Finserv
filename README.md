# Bajaj Finserv API Challenge

This repository contains a RESTful API built with **Node.js + Express** for the Bajaj Finserv Online Test.  
The API accepts an array of strings, classifies them into categories, and returns structured results.

---

## 🚀 Features

- Accepts an array of mixed inputs (numbers, alphabets, special characters).
- Separates **odd numbers**, **even numbers**, **alphabets (UPPERCASE)**, and **special characters**.
- Computes **sum** of numbers (returned as a string).
- Builds a **concat_string** by reversing all alphabetic characters and applying alternating case.
- Returns user details (`user_id`, `email`, `roll_number`) from environment variables.
- Returns proper **success/failure responses**.
- Deployable on **Render, Railway, or Vercel**.

---

## 📌 API Endpoints

### 1. Health Check
`GET /`  
Returns `OK` if the service is running.

### 2. Process Data
`POST /bfhl`

**Request Body**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
