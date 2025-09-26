import React from "react";
import { useNavigate } from "react-router-dom";
import "./maincss/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/customerlogin"); // navigates inside React Router
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Online Banking System</h1>
        <p>Secure • Reliable • Fast</p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Account Management</h3>
          <p>View balances, check statements, and manage multiple accounts easily.</p>
        </div>
        <div className="feature-card">
          <h3>Fund Transfers</h3>
          <p>Transfer money securely to any account anytime, anywhere.</p>
        </div>
        <div className="feature-card">
          <h3>Bill Payments</h3>
          <p>Pay your bills online with just a few clicks – safe and convenient.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
