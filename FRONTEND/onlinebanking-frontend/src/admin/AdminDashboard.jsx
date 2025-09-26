import { useEffect, useState } from "react";
import axios from "axios";
import "./admincss/AdminDashboard.css";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    customerCount: 0,
    staffCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [customerRes, staffRes] = await Promise.all([
          axios.get(`${API_URL}/customercount`),
          axios.get(`${API_URL}/staffcount`),
        ]);

        setStats({
          customerCount: customerRes.data,
          staffCount: staffRes.data,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Admin Dashboard</h1>
          <p>Banking System Overview</p>
        </div>
        <div className="admin-avatar">
          <span>A</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div> {/* Customers */}
          <div className="stat-content">
            <h3>{stats.customerCount}</h3>
            <p>Total Customers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🧑‍💼</div> {/* Staff */}
          <div className="stat-content">
            <h3>{stats.staffCount}</h3>
            <p>Total Staff</p>
          </div>
        </div>
      </div>
    </div>
  );
}
