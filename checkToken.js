const jwt = require("jsonwebtoken");
require("dotenv").config(); // make sure it loads JWT_SECRET

// 👉 Copy the token you got after register/login and paste it below
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjBhZTQ5YzU0NzI5M2I4NGZjMjI2NiIsImlhdCI6MTc1NjQwOTQxNywiZXhwIjoxNzU2NDk1ODE3fQ.TV3njLpt2X7Empn4n62Q_A_vj-cyZZRPWY4CrwACFIo";

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("✅ Decoded token:", decoded);
} catch (err) {
  console.error("❌ Invalid token:", err.message);
}
