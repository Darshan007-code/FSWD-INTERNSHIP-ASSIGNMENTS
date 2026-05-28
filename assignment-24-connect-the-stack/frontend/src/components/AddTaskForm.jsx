import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", priority: "medium" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLoading(true);
    await onAdd(form);
    setForm({ title: "", description: "", priority: "medium" });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.heading}>➕ Add New Task</h3>
      <input
        style={styles.input} placeholder="Task title *" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} required
      />
      <input
        style={styles.input} placeholder="Description (optional)" value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div style={styles.row}>
        <select style={styles.select} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option value="low">🟢 Low</option>
          <option value="medium">🟠 Medium</option>
          <option value="high">🔴 High</option>
        </select>
        <button style={styles.btn} type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: { background: "#fff", borderRadius: "12px", padding: "1.25rem", marginBottom: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" },
  heading: { margin: "0 0 1rem", color: "#2d3748" },
  input: { display: "block", width: "100%", padding: "0.65rem", marginBottom: "0.75rem", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.95rem", boxSizing: "border-box" },
  row: { display: "flex", gap: "0.75rem", alignItems: "center" },
  select: { flex: 1, padding: "0.65rem", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.95rem" },
  btn: { padding: "0.65rem 1.25rem", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.95rem" },
};
