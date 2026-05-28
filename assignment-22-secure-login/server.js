const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/securelogin")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error:", err));

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => res.json({ message: "🔐 Secure Login API", endpoints: { "POST /api/auth/signup": "Register", "POST /api/auth/login": "Login", "GET /api/auth/me": "Get profile (requires Bearer token)" } }));
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`🔐 Secure Login running at http://localhost:${PORT}`));
