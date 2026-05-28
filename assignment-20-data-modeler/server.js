const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/blogdb")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import models (just to register them)
require("./models/User");
require("./models/Category");
require("./models/Post");
require("./models/Comment");

app.get("/", (req, res) => {
  res.json({
    message: "📝 Blog Platform - Schema Design",
    models: ["User", "Post", "Comment", "Category"],
    relationships: {
      "Post.author": "→ User (ref)",
      "Post.category": "→ Category (ref)",
      "Post.likes": "→ [User] (ref array)",
      "Comment.author": "→ User (ref)",
      "Comment.post": "→ Post (ref)",
      "Comment.parentComment": "→ Comment (ref, for replies)",
    },
  });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`📝 Data Modeler running at http://localhost:${PORT}`));
