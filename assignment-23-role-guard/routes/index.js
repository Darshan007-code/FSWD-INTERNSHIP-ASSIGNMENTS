const express = require("express");
const app = express.Router();
const { signup, login } = require("../controllers/authController");
const { getAllUsers, deleteUser, changeRole, dashboard } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Auth routes (public)
app.post("/auth/signup", signup);
app.post("/auth/login", login);

// User routes (any logged-in user)
app.get("/dashboard", protect, dashboard);

// Admin-only routes
app.get("/admin/users", protect, authorize("admin"), getAllUsers);
app.delete("/admin/users/:id", protect, authorize("admin"), deleteUser);
app.patch("/admin/users/:id/role", protect, authorize("admin"), changeRole);

module.exports = app;
