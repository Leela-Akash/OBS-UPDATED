import React from "react";
import "./maincss/About.css";

export default function About() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Our Online Banking System</h1>
        <p className="about-subtitle">
          Secure, fast, and convenient banking at your fingertips.
        </p>
      </section>

      <section className="about-content">
        <div className="about-card">
          <h2>Account Management</h2>
          <p>
            Manage multiple accounts easily, track balances, view statements,
            and monitor transaction history in real-time.
          </p>
        </div>

        <div className="about-card">
          <h2>Fund Transfers & Payments</h2>
          <p>
            Transfer funds instantly between accounts, pay bills, and set up
            recurring payments safely and securely.
          </p>
        </div>

        <div className="about-card">
          <h2>Loans & Services</h2>
          <p>
            Request personal, home, or business loans directly through your
            online account and track approvals and disbursements efficiently.
          </p>
        </div>

        <div className="about-card">
          <h2>Security</h2>
          <p>
            Your security is our priority. We use multi-factor authentication
            and encryption to ensure your data and transactions remain safe.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <h2>Experience Seamless Banking Today</h2>
        <p>Join our online banking platform and manage your finances effortlessly.</p>
      </section>
    </div>
  );
}
