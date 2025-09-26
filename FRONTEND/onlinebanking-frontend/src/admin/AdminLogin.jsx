import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
 
import { useAuth } from "../contextapi/AuthContext"
import "./admincss/AdminLogin.css";

// Vite environment variable for backend URL
const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      if (response.status === 200) {
        sessionStorage.setItem("admin", JSON.stringify(response.data));
        setIsAdminLoggedIn(true);
        navigate("/");
      } else {
        setMessage(response.data);
      }
    } catch (err) {
      setError(err.response?.data || "An unexpected error occurred.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Admin Login</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          <button type="submit" className="signin-button">
            Login
          </button>
        </form>

        <p className="signup-link">
          Not an Admin? <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
