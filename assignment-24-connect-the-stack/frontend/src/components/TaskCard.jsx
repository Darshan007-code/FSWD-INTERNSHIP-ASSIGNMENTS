export default function TaskCard({ task, onDelete, onUpdate }) {
  const priorityColors = { low: "#48bb78", medium: "#ed8936", high: "#fc8181" };
  const statusColors = { pending: "#a0aec0", "in-progress": "#4299e1", completed: "#68d391" };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{task.title}</h3>
        <div style={styles.badges}>
          <span style={{ ...styles.badge, background: priorityColors[task.priority] }}>{task.priority}</span>
          <span style={{ ...styles.badge, background: statusColors[task.status] }}>{task.status}</span>
        </div>
      </div>
      {task.description && <p style={styles.desc}>{task.description}</p>}
      <div style={styles.actions}>
        <select
          style={styles.select}
          value={task.status}
          onChange={(e) => onUpdate(task._id, { status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button style={styles.deleteBtn} onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}

const styles = {
  card: { background: "#fff", borderRadius: "10px", padding: "1rem 1.25rem", marginBottom: "0.75rem", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" },
  title: { margin: 0, fontSize: "1rem", fontWeight: 600, color: "#2d3748" },
  badges: { display: "flex", gap: "0.4rem", flexShrink: 0, marginLeft: "0.5rem" },
  badge: { padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, color: "#fff" },
  desc: { color: "#718096", fontSize: "0.875rem", margin: "0 0 0.75rem" },
  actions: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" },
  select: { padding: "0.35rem 0.6rem", borderRadius: "6px", border: "1px solid #e2e8f0", fontSize: "0.875rem", cursor: "pointer" },
  deleteBtn: { padding: "0.35rem 0.75rem", background: "#fff5f5", color: "#c53030", border: "1px solid #fc8181", borderRadius: "6px", cursor: "pointer", fontSize: "0.875rem" },
};
