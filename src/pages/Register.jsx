import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://ecommerce-backend-production-eebf.up.railway.app";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.status === 201) {
        alert("Account created! Please login.");
        navigate("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Cannot connect to server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "sans-serif"
    }}>
      <h2>Register</h2>

      {error && (
        <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>
      )}

      <div style={{ marginBottom: "8px" }}>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          padding: "8px 20px",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: "#6c3bff",
          color: "white",
          border: "none",
          borderRadius: "4px"
        }}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p style={{ marginTop: "12px" }}>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "#6c3bff", cursor: "pointer" }}
        >
          Login
        </span>
      </p>
    </div>
  );
}
