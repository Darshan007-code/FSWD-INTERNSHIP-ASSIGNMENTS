import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Password strength check
  const getStrength = () => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return "Weak";
    if (score === 2 || score === 3) return "Medium";
    return "Strong";
  };

  const validate = () => {
    let newErrors = {};

    if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Invalid email format";
    }

    if (password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    if (validate()) {
      setSuccess("Signup successful!");
      setEmail("");
      setPassword("");
    }
  };

  const strength = getStrength();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {password && (
            <p style={styles.strength}>
              Strength: <b>{strength}</b>
            </p>
          )}

          {errors.password && <p style={styles.error}>{errors.password}</p>}

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        {success && <p style={styles.success}>{success}</p>}
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
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    fontFamily: "Segoe UI"
  },
  card: {
    background: "white",
    padding: "35px",
    borderRadius: "15px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 15px 30px rgba(0,0,0,0.4)"
  },
  title: {
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "12px",
    margin: 0
  },
  success: {
    color: "green",
    marginTop: "10px"
  },
  strength: {
    fontSize: "13px",
    margin: "5px 0"
  }
};

export default App;