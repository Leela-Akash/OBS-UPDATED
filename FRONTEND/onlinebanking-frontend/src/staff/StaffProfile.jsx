import { useState, useEffect } from "react";
import axios from "axios";
import "./staffcss/StaffProfile.css";

const API_URL = `${import.meta.env.VITE_API_URL}/staff`;

export default function StaffProfile() {
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const storedStaff = sessionStorage.getItem("staff");
    const staffId = sessionStorage.getItem("staffId");

    if (staffId) {
      axios
        .get(`${API_URL}/profile/${staffId}`)
        .then((res) => setStaff(res.data))
        .catch((err) => console.error("Staff profile fetch error:", err));
    } else if (storedStaff) {
      setStaff(JSON.parse(storedStaff)); // fallback
    }
  }, []);

  if (!staff) {
    return (
      <div className="loading-message">
        <div className="loading-spinner"></div>
        Loading profile...
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
    <div className="staff-profile-container">
      {/* Header */}
      <div className="staff-profile-header">
        {staff.image ? (
          <img src={staff.image} alt="Staff" className="staff-profile-image" />
        ) : (
          <div className="staff-avatar">{getInitials(staff.fullName)}</div>
        )}

        <div className="staff-header-info">
          <h2 className="staff-name">{staff.fullName}</h2>
          <p className="staff-role">{staff.role || "Staff"}</p>
          <p className="staff-bio">{staff.bio || "Dedicated team member."}</p>
        </div>
      </div>

      {/* Profile Info Grid */}
      <div className="staff-profile-details">
        <div className="detail-item">
          <span className="detail-label">Full Name</span>
          <span className="detail-value">{staff.fullName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Username</span>
          <span className="detail-value">{staff.username}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email</span>
          <span className="detail-value">{staff.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Phone</span>
          <span className="detail-value">{staff.phone}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Role</span>
          <span className="detail-value">{staff.role || "Staff"}</span>
        </div>
      </div>
    </div>
  );
}
