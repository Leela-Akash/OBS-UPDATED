import { useState } from "react";
import axios from "axios";
import "./staffcss/StaffLogin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";

const API_URL = `${import.meta.env.VITE_API_URL}/staff`;

export default function StaffLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsStaffLoggedIn } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, formData);
      if (res.status === 200) {
        // JWT login - store token and user info
        const { token, id, username, role } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);
        localStorage.setItem("userRole", role);
        
        // Get full staff data
        try {
          const staffRes = await axios.get(`${API_URL}/profile/${id}`);
          sessionStorage.setItem("staff", JSON.stringify(staffRes.data));
        } catch (err) {
          sessionStorage.setItem("staff", JSON.stringify({ id, username }));
        }

        setIsStaffLoggedIn(true);
        setMessage("Login successful!");
        setError("");

        navigate("/dashboard");  
      }
    } catch (err) {
      setMessage("");
      if (err.response) setError(err.response.data);
      else setError("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h3>Staff Login</h3>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <div>
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
