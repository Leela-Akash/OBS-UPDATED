import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";
import "./customercss/CustomerLogin.css";

// API base URL from .env
const API_URL = `${import.meta.env.VITE_API_URL}/customer`;

export default function CustomerLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsCustomerLoggedIn } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, formData);
      // JWT login - store token and user info
      const { token, id, username, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      localStorage.setItem("userRole", role);
      
      // Get full customer data
      try {
        const customerRes = await axios.get(`${API_URL}/${id}`);
        sessionStorage.setItem("customer", JSON.stringify(customerRes.data));
      } catch (err) {
        // If fetch fails, store basic info
        sessionStorage.setItem("customer", JSON.stringify({ id, username }));
      }
      
      setIsCustomerLoggedIn(true);
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data || "Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Customer Sign In</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/customerregistration">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
