const User = require("../models/User");

// GET /api/admin/users — Admin only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/admin/users/:id — Admin only
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/admin/users/:id/role — Admin only: change user role
exports.changeRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "admin", "moderator"].includes(role))
      return res.status(400).json({ success: false, message: "Invalid role" });

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: `Role updated to ${role}`, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/dashboard — User + Admin
exports.dashboard = (req, res) => {
  res.json({ success: true, message: `Welcome ${req.user.name}! Role: ${req.user.role}`, data: { id: req.user._id, name: req.user.name, role: req.user.role } });
};
