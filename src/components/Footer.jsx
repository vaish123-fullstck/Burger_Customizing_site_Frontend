import React from "react";
import "./Footer.css"; // Ensure you create a corresponding CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@brrrgrrr.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Burger Lane, Foodie City</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Brrrgrrr. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
