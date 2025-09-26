import React, { useState, useEffect } from "react";
import axios from "axios";
import "./staffcss/Transactions.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const API_URL = `${import.meta.env.VITE_API_URL}/transaction`;

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      setTransactions(res.data);
    } catch (err) {
      setError("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 5000);  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="transactions-container">
      <h2>All Transactions (Staff View)</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={7}>No transactions found</td>
            </tr>
          ) : (
            transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>{txn.customer?.id}</td>
                <td>{txn.customer?.fullName}</td>
                <td>{txn.type}</td>
                <td>₹{txn.amount.toLocaleString()}</td>
                <td>{txn.description || "-"}</td>
                <td>{new Date(txn.transactionDate).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
