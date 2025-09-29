//require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorhandler"); // use correct casing
const authRoutes = require("./routes/auth");
const shlokaRoutes = require("./routes/shloka");
require('dotenv').config(); // uncomment if using .env

const app = express(); // initialize app first
app.use("/api/shloka", shlokaRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));

// Rate limiter for login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { status: "fail", message: "Too many login attempts, try again later." }
});
app.use("/api/auth/login", loginLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/shlokas", shlokaRoutes);

// Error handler (must be after routes)
app.use(errorHandler);

// MongoDB connection and server start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => console.log("❌ MongoDB connection error:", err));
