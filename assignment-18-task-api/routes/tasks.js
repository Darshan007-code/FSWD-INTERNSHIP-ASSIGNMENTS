const express = require("express");
const router = express.Router();
const { tasks, getNextId } = require("../data/store");

// GET /api/tasks - Get all tasks (optional filters: status, priority)
router.get("/", (req, res) => {
  let result = [...tasks];

  if (req.query.status) {
    result = result.filter((t) => t.status === req.query.status);
  }
  if (req.query.priority) {
    result = result.filter((t) => t.priority === req.query.priority);
  }

  res.status(200).json({ success: true, count: result.length, data: result });
});

// GET /api/tasks/:id - Get single task
router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  res.status(200).json({ success: true, data: task });
});

// POST /api/tasks - Create a new task
router.post("/", (req, res) => {
  const { title, description, priority } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: "Title is required" });
  }

  const validPriorities = ["low", "medium", "high"];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ success: false, message: "Priority must be low, medium, or high" });
  }

  const newTask = {
    id: getNextId(),
    title,
    description: description || "",
    status: "pending",
    priority: priority || "medium",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json({ success: true, message: "Task created", data: newTask });
});

// PUT /api/tasks/:id - Update a task (full update)
router.put("/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: "Task not found" });

  const { title, description, status, priority } = req.body;

  const validStatuses = ["pending", "in-progress", "completed"];
  const validPriorities = ["low", "medium", "high"];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Status must be pending, in-progress, or completed" });
  }
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ success: false, message: "Priority must be low, medium, or high" });
  }

  tasks[index] = {
    ...tasks[index],
    title: title || tasks[index].title,
    description: description !== undefined ? description : tasks[index].description,
    status: status || tasks[index].status,
    priority: priority || tasks[index].priority,
    updatedAt: new Date().toISOString(),
  };

  res.status(200).json({ success: true, message: "Task updated", data: tasks[index] });
});

// PATCH /api/tasks/:id/status - Update only task status
router.patch("/:id/status", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: "Task not found" });

  const { status } = req.body;
  const validStatuses = ["pending", "in-progress", "completed"];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Status must be pending, in-progress, or completed" });
  }

  tasks[index].status = status;
  tasks[index].updatedAt = new Date().toISOString();

  res.status(200).json({ success: true, message: "Status updated", data: tasks[index] });
});

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: "Task not found" });

  const deleted = tasks.splice(index, 1);
  res.status(200).json({ success: true, message: "Task deleted", data: deleted[0] });
});

module.exports = router;
