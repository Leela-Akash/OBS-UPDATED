import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./customercss/CustomerRegistration.css";

// Use Vite environment variable
const API_URL = `${import.meta.env.VITE_API_URL}/customer`;

export default function CustomerRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, formData);

      // ✅ Success case (201 Created)
      if (response.status === 201) {
        setMessage(response.data);
        setError("");
        // Reset form
        setFormData({
          fullName: "",
          gender: "",
          dob: "",
          email: "",
          username: "",
          password: "",
          phone: "",
          address: "",
        });
      }
    } catch (err) {
      // ✅ Duplicate / Conflict (409)
      if (err.response?.status === 409) {
        setError(err.response.data); // "Username already exists!"
        setMessage("");
      } 
      // ✅ Any other error
      else {
        setError("An unexpected error occurred.");
        setMessage("");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h3>Create Customer Account</h3>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter full name"
          />

          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Choose username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create password"
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter your address"
          />

          <button type="submit">Create Account</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/customerlogin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
