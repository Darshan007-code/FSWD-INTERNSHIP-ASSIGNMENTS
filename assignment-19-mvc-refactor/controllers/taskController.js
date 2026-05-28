// CONTROLLER: Handles HTTP requests and responses

const TaskModel = require("../models/taskModel");

const taskController = {
  // GET /api/tasks
  getAllTasks: (req, res) => {
    const tasks = TaskModel.getAll(req.query);
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  },

  // GET /api/tasks/:id
  getTaskById: (req, res) => {
    const task = TaskModel.getById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, data: task });
  },

  // POST /api/tasks
  createTask: (req, res) => {
    const { title, description, priority } = req.body;

    if (!title) return res.status(400).json({ success: false, message: "Title is required" });
    if (priority && !TaskModel.isValidPriority(priority)) {
      return res.status(400).json({ success: false, message: "Priority must be low, medium, or high" });
    }

    const task = TaskModel.create({ title, description, priority });
    res.status(201).json({ success: true, message: "Task created", data: task });
  },

  // PUT /api/tasks/:id
  updateTask: (req, res) => {
    const { title, description, status, priority } = req.body;

    if (status && !TaskModel.isValidStatus(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }
    if (priority && !TaskModel.isValidPriority(priority)) {
      return res.status(400).json({ success: false, message: "Invalid priority value" });
    }

    const task = TaskModel.update(req.params.id, { title, description, status, priority });
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    res.status(200).json({ success: true, message: "Task updated", data: task });
  },

  // PATCH /api/tasks/:id/status
  updateTaskStatus: (req, res) => {
    const { status } = req.body;
    if (!status || !TaskModel.isValidStatus(status)) {
      return res.status(400).json({ success: false, message: "Status must be pending, in-progress, or completed" });
    }

    const task = TaskModel.update(req.params.id, { status });
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    res.status(200).json({ success: true, message: "Status updated", data: task });
  },

  // DELETE /api/tasks/:id
  deleteTask: (req, res) => {
    const task = TaskModel.delete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, message: "Task deleted", data: task });
  },
};

module.exports = taskController;
