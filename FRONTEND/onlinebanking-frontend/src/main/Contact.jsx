import React from "react";
import "./maincss/Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact OnlineBank</h2>
      <p>
        Have questions or need assistance? Our support team is available 24/7 to help you.
      </p>

      {/* Contact Info */}
      <div className="contact-info">
        <div className="info-box">
          <i className="fas fa-envelope"></i>
          <h4>Email</h4>
          <p>support@onlinebank.com</p>
        </div>
        <div className="info-box">
          <i className="fas fa-phone-alt"></i>
          <h4>Phone</h4>
          <p>+91 8885277944</p>
        </div>
        <div className="info-box">
          <i className="fas fa-map-marker-alt"></i>
          <h4>Address</h4>
          <p>KL UNIVERSITY BANKING VIJAYAWADA</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
