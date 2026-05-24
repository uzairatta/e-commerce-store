import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://ecommerce-backend-production-eebf.up.railway.app";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.error || "Invalid credentials");
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
      <h2>Login</h2>

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
        onClick={handleLogin}
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
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={{ marginTop: "12px" }}>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          style={{ color: "#6c3bff", cursor: "pointer" }}
        >
          Register
        </span>
      </p>
    </div>
  );
}
