import React from "react";
import "../styles/Cart.css";

export default function Cart({ cartItems }) {
  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>₹ {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
