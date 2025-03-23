import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import cartIcon from "../assets/fc.png"; // Import your cart icon

export default function Navbar({ cartCount }) {
  const navigate = useNavigate();

  const handleHomeClick = () => navigate("/");
  const handleMenuClick = () => navigate("/menu");
  const handleCustomizeClick = () => navigate("/customize");
  const handleCartClick = () => navigate("/cart"); // Navigate to cart page

  return (
    <nav className="navbar">
      <h1>Brrrgrrr 🍔</h1>
      <ul>
        <li onClick={handleHomeClick}>Home</li>
        <li onClick={handleMenuClick}>Menu</li>
        <li>About Us</li>
        <li>
          <button className="customize-btn" onClick={handleCustomizeClick}>
            Customize
          </button>
        </li>
      </ul>
      {/* Cart Icon on the Right */}
      <div className="cart-container" onClick={handleCartClick}>
        <div className="cart-icon">
          <img src={cartIcon} alt="Cart" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
}
