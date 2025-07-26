import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import cartIcon from "../assets/fc.png"; // Using your cart icon import

export default function Navbar({ cartCount }) {
  const navigate = useNavigate();
  // State to manage the mobile menu's visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to close the menu after navigation
  const handleLinkClick = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close the menu
  };

  return (
    <nav className="navbar">
      {/* Hamburger Menu Icon (only visible on mobile via CSS) */}
      <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      {/* Brand Name - now clickable */}
      <h1 onClick={() => handleLinkClick("/")}>Brrrgrrr 🍔</h1>

      {/* Navigation Links - class is now dynamic */}
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li onClick={() => handleLinkClick("/")}>Home</li>
        <li onClick={() => handleLinkClick("/menu")}>Menu</li>
        <li>About Us</li>
        <li>
          <button className="customize-btn" onClick={() => handleLinkClick("/customize")}>
            Customize
          </button>
        </li>
      </ul>

      {/* Cart Icon on the Right */}
      <div className="cart-container" onClick={() => handleLinkClick("/cart")}>
        <div className="cart-icon">
          <img src={cartIcon} alt="Cart" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
}
