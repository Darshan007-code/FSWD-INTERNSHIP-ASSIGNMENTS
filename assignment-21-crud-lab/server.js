const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/crudlab")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error:", err));

app.use("/api/posts", require("./routes/postRoutes"));

app.get("/", (req, res) => res.json({ message: "🧪 CRUD Lab - Mongoose Operations" }));
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`🧪 CRUD Lab running at http://localhost:${PORT}`));
