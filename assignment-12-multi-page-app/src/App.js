import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Tasks from "./Tasks";

function App() {
  return (
    <Router>
      <div style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/tasks" style={styles.link}>Tasks</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "15px",
    background: "#1e3a8a"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default App;