const express = require("express");
const app = express();

app.use(express.json());

const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "✅ Task Manager API",
    version: "1.0.0",
    endpoints: {
      "GET /api/tasks": "Get all tasks (optional: ?status=pending&priority=high)",
      "GET /api/tasks/:id": "Get single task",
      "POST /api/tasks": "Create task { title, description, priority }",
      "PUT /api/tasks/:id": "Update task",
      "PATCH /api/tasks/:id/status": "Update status only { status }",
      "DELETE /api/tasks/:id": "Delete task",
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Task API running at http://localhost:${PORT}`));
