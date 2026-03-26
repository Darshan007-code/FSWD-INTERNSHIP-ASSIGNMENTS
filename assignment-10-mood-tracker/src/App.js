import React, { useState } from "react";

function App() {
  const [mood, setMood] = useState("😊");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Mood Tracker</h1>

        <h2 style={styles.mood}>Your Mood: {mood}</h2>

        <div style={styles.buttons}>
          <button style={styles.btn} onClick={() => setMood("😊")}>Happy</button>
          <button style={styles.btn} onClick={() => setMood("😢")}>Sad</button>
          <button style={styles.btn} onClick={() => setMood("😡")}>Angry</button>
          <button style={styles.btn} onClick={() => setMood("😎")}>Cool</button>
        </div>
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
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  },
  mood: {
    fontSize: "28px",
    margin: "20px 0"
  },
  buttons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center"
  },
  btn: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold"
  }
};

export default App;