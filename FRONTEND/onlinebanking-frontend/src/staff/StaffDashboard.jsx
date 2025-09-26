import { useEffect, useState } from "react";
import axios from "axios";
import "./staffcss/Dashboard.css";

const API_URL = `${import.meta.env.VITE_API_URL}/staff`;

export default function StaffDashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_URL}/dashboard`);
        const data = res.data;

        setStats({
          totalCustomers: data.totalCustomers,
          totalDeposits: data.totalDeposits,
          totalWithdrawals: data.totalWithdrawals,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
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
    <div className="staff-dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Staff Dashboard</h1>
          <p>Banking System Overview</p>
        </div>
        <div className="staff-avatar">
          <span>S</span>
        </div>
      </div>

      {error && <p className="dashboard-error">{error}</p>}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalCustomers}</h3>
            <p>Total Customers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>{stats.totalDeposits}</h3>
            <p>Total Deposits</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💸</div>
          <div className="stat-content">
            <h3>{stats.totalWithdrawals}</h3>
            <p>Total Withdrawals</p>
          </div>
        </div>
      </div>
    </div>
  );
}
