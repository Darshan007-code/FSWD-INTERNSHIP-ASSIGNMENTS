import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add task
  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, task]);
    setTask("");
  };

  // Delete task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Task List</h1>

        <div style={styles.inputBox}>
          <input
            type="text"
            value={task}
            placeholder="Enter task"
            onChange={(e) => setTask(e.target.value)}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addBtn}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((t, index) => (
            <li key={index} style={styles.item}>
              {t}
              <button
                onClick={() => deleteTask(index)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3a8a, #06b6d4)",
    fontFamily: "Arial"
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
  },
  input: {
    flex: 1,
    padding: "8px"
  },
  addBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    background: "#f1f5f9",
    padding: "8px",
    borderRadius: "5px"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default App;