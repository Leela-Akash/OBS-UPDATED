import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffcss/LoanApproval.css';

const API_URL = `${import.meta.env.VITE_API_URL}/loan`;

export default function LoanApproval() {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [allLoans, setAllLoans] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const [pendingRes, allRes] = await Promise.all([
        axios.get(`${API_URL}/pending`),
        axios.get(`${API_URL}/all`)
      ]);
      setPendingLoans(pendingRes.data);
      setAllLoans(allRes.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const handleApprove = async (loanId) => {
    if (!window.confirm('Are you sure you want to approve this loan?')) return;

    try {
      setLoading(true);
      await axios.put(`${API_URL}/approve/${loanId}`, {
        comments: 'Loan approved by staff'
      });
      showStatus('success', 'Loan approved successfully!');
      fetchLoans();
    } catch (error) {
      showStatus('error', error.response?.data?.error || 'Failed to approve loan');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (loanId) => {
    const reason = window.prompt('Please enter rejection reason:');
    if (!reason) return;

    try {
      setLoading(true);
      await axios.put(`${API_URL}/reject/${loanId}`, {
        comments: reason
      });
      showStatus('success', 'Loan rejected');
      fetchLoans();
    } catch (error) {
      showStatus('error', error.response?.data?.error || 'Failed to reject loan');
    } finally {
      setLoading(false);
    }
  };

  const handleDisburse = async (loanId) => {
    if (!window.confirm('Disburse loan amount to customer account?')) return;

    try {
      setLoading(true);
      await axios.put(`${API_URL}/disburse/${loanId}`);
      showStatus('success', 'Loan disbursed successfully! Amount credited to customer account.');
      fetchLoans();
    } catch (error) {
      showStatus('error', error.response?.data?.error || 'Failed to disburse loan');
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (type, message) => {
    setActionStatus({ show: true, type, message });
    setTimeout(() => setActionStatus({ show: false, message: '', type: '' }), 4000);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#ff9800',
      'Approved': '#4caf50',
      'Rejected': '#f44336',
      'Active': '#2196f3',
      'Completed': '#9e9e9e'
    };
    return colors[status] || '#666';
  };

  const loansToDisplay = activeTab === 'pending' ? pendingLoans : allLoans;

  return (
    <div className="loan-approval-container">
      <div className="loan-approval-header">
        <h2>🔍 Loan Management</h2>
        <div className="tabs">
          <button
            className={activeTab === 'pending' ? 'active' : ''}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({pendingLoans.length})
          </button>
          <button
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Loans ({allLoans.length})
          </button>
        </div>
      </div>

      {actionStatus.show && (
        <div className={`status-message ${actionStatus.type}`}>
          {actionStatus.type === 'success' ? '✓' : '✗'} {actionStatus.message}
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          Processing...
        </div>
      )}

      {pendingLoans.length === 0 && activeTab === 'pending' ? (
        <div className="no-loans">
          <p>No pending loan requests</p>
        </div>
      ) : (
        <div className="loans-grid">
          {loansToDisplay.map(loan => (
            <div key={loan.id} className="loan-card">
              <div className="loan-header-section">
                <div>
                  <h3>{loan.loanType}</h3>
                  <p className="customer-name">
                    {loan.customer?.fullName} (ID: {loan.customer?.id})
                  </p>
                </div>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(loan.status) }}
                >
                  {loan.status}
                </span>
              </div>

              <div className="loan-details-grid">
                <div className="detail-item">
                  <span className="label">Amount</span>
                  <span className="value">₹{loan.loanAmount?.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Interest Rate</span>
                  <span className="value">{loan.interestRate}% APR</span>
                </div>
                <div className="detail-item">
                  <span className="label">Tenure</span>
                  <span className="value">{loan.tenureMonths} months</span>
                </div>
                <div className="detail-item">
                  <span className="label">Purpose</span>
                  <span className="value">{loan.purpose}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Request Date</span>
                  <span className="value">{new Date(loan.requestDate).toLocaleDateString()}</span>
                </div>
              </div>

              {loan.comments && (
                <div className="comments-section">
                  <strong>Comments:</strong> {loan.comments}
                </div>
              )}

              {loan.status === 'Pending' && (
                <div className="action-buttons">
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(loan.id)}
                    disabled={loading}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(loan.id)}
                    disabled={loading}
                  >
                    ✗ Reject
                  </button>
                </div>
              )}

              {loan.status === 'Approved' && (
                <div className="action-buttons">
                  <button
                    className="disburse-btn"
                    onClick={() => handleDisburse(loan.id)}
                    disabled={loading}
                  >
                    💰 Disburse Loan
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
