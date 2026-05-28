const express = require("express");
const app = express();

app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🏗️ Task API - MVC Architecture", structure: { Model: "models/taskModel.js", Controller: "controllers/taskController.js", Routes: "routes/taskRoutes.js" } });
});

app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }));
app.use((err, req, res, next) => res.status(500).json({ success: false, message: "Internal Server Error" }));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🏗️ MVC Task API running at http://localhost:${PORT}`));
