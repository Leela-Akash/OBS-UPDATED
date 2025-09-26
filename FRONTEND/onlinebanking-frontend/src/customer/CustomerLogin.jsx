import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";
import "./customercss/CustomerLogin.css";

const API_URL = `${import.meta.env.VITE_API_URL}/customer`;

export default function CustomerLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
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
      setMessage("");
      setError("");
      sessionStorage.setItem("customer", JSON.stringify(res.data));
      setIsCustomerLoggedIn(true);
      navigate("/");
    } catch (err) {
      setMessage("");
      setError(err.response?.data || "Unexpected error occurred.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Customer Sign In</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required placeholder="Enter your username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" />

          <button type="submit" className="signin-button">Sign In</button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/customerregistration">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
