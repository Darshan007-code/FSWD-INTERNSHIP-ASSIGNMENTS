const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/roleguard")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error:", err));

app.use("/api", require("./routes/index"));

app.get("/", (req, res) => res.json({
  message: "🛡️ Role Guard API",
  publicRoutes: ["POST /api/auth/signup", "POST /api/auth/login"],
  userRoutes: ["GET /api/dashboard (requires login)"],
  adminRoutes: ["GET /api/admin/users", "DELETE /api/admin/users/:id", "PATCH /api/admin/users/:id/role"],
}));

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`🛡️ Role Guard running at http://localhost:${PORT}`));
