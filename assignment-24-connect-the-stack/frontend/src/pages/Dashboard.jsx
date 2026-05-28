import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tasks");
      setTasks(data.data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      const { data } = await api.post("/tasks", formData);
      setTasks((prev) => [data.data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete task");
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, updates);
      setTasks((prev) => prev.map((t) => (t._id === id ? data.data : t)));
    } catch {
      setError("Failed to update task");
    }
  };

  const handleLogout = () => { logout(); navigate("/login"); };

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const counts = { all: tasks.length, pending: tasks.filter(t => t.status === "pending").length, "in-progress": tasks.filter(t => t.status === "in-progress").length, completed: tasks.filter(t => t.status === "completed").length };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>📋 My Tasks</h1>
            <p style={styles.subheading}>Welcome back, {user?.name}!</p>
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>

        {/* Stats */}
        <div style={styles.stats}>
          {Object.entries(counts).map(([key, val]) => (
            <div key={key} style={{ ...styles.stat, ...(filter === key ? styles.statActive : {}) }} onClick={() => setFilter(key)}>
              <div style={styles.statNum}>{val}</div>
              <div style={styles.statLabel}>{key}</div>
            </div>
          ))}
        </div>

        {error && <div style={styles.error}>{error} <button onClick={() => setError("")} style={styles.closeErr}>✕</button></div>}

        <AddTaskForm onAdd={handleAdd} />

        {loading ? (
          <div style={styles.loading}>Loading tasks...</div>
        ) : filtered.length === 0 ? (
          <div style={styles.empty}>No {filter !== "all" ? filter : ""} tasks yet. Add one above!</div>
        ) : (
          filtered.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f0f4f8", padding: "1.5rem 1rem" },
  container: { maxWidth: "680px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
  heading: { margin: 0, color: "#1a202c", fontSize: "1.75rem" },
  subheading: { margin: "0.25rem 0 0", color: "#718096" },
  logoutBtn: { padding: "0.5rem 1rem", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", color: "#4a5568" },
  stats: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" },
  stat: { background: "#fff", borderRadius: "10px", padding: "0.75rem", textAlign: "center", cursor: "pointer", border: "2px solid transparent", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
  statActive: { border: "2px solid #4f46e5", background: "#eef2ff" },
  statNum: { fontSize: "1.5rem", fontWeight: 700, color: "#2d3748" },
  statLabel: { fontSize: "0.75rem", color: "#718096", textTransform: "capitalize" },
  error: { background: "#fed7d7", color: "#c53030", padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "1rem", display: "flex", justifyContent: "space-between" },
  closeErr: { background: "none", border: "none", cursor: "pointer", color: "#c53030", fontWeight: 700 },
  loading: { textAlign: "center", color: "#718096", padding: "2rem" },
  empty: { textAlign: "center", color: "#a0aec0", padding: "2rem", background: "#fff", borderRadius: "10px" },
};
