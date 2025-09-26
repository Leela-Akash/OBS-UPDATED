import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./customercss/CustomerProfile.css";

export default function CustomerProfile() {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem("customer");
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }
  }, []);

  if (!customer) {
    return (
      <div className="loading-message">
        <div className="loading-spinner"></div>
        Loading customer profile...
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="customer-profile-container">
      {/* Header */}
      <div className="customer-profile-header">
        <div className="customer-avatar">{getInitials(customer.fullName)}</div>
        <div className="customer-info">
          <h2>{customer.fullName}</h2>
          <p>Welcome back, {customer.fullName}!</p>
        </div>
      </div>

      {/* Profile Info Grid */}
      <div className="customer-profile-details">
        <div className="detail-item">
          <span className="detail-label">Full Name</span>
          <span className="detail-value">{customer.fullName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Gender</span>
          <span className="detail-value">{customer.gender}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Date of Birth</span>
          <span className="detail-value">{customer.dob}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email</span>
          <span className="detail-value">{customer.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Username</span>
          <span className="detail-value">{customer.username}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Phone</span>
          <span className="detail-value">{customer.phone}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Address</span>
          <span className="detail-value">{customer.address}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="customer-actions">
        <button onClick={() => navigate("/update")}>✏️ Update Profile</button>
        <button onClick={() => navigate("/")}>🏠 Back to Home</button>
      </div>
    </div>
  );
}
