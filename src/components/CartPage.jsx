import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuCategories } from './menuData'; // We need all menu data for suggestions
import '../styles/CartPage.css';

export default function CartPage({ cartItems, setCartItems, addToCart }) { // Added addToCart prop
  const [suggestedItems, setSuggestedItems] = useState([]);
  const navigate = useNavigate();

  // Function to generate suggested items
  useEffect(() => {
    const generateSuggestions = () => {
      const cartItemNames = cartItems.map(item => item.name);
      const hasBeverage = cartItems.some(item => item.category === 'Beverages');
      let potentialSuggestions = [];

      if (!hasBeverage) {
        // If no drinks in cart, suggest some beverages
        potentialSuggestions = menuCategories.Beverages.items;
      } else {
        // Otherwise, suggest popular food items not already in the cart
        potentialSuggestions = [
          ...menuCategories.Burgers.items,
          ...menuCategories.Breakfast.items,
          ...menuCategories.FishnChicken.items,
        ].filter(item => !cartItemNames.includes(item.name));
      }

      // Shuffle and pick the top 3-4 suggestions
      const shuffled = potentialSuggestions.sort(() => 0.5 - Math.random());
      setSuggestedItems(shuffled.slice(0, 3));
    };

    generateSuggestions();
  }, [cartItems]);

  // --- Helper functions for cart management ---
  const handleUpdateQuantity = (itemToUpdate, amount) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemToUpdate.id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemToRemove) => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.id !== itemToRemove.id)
    );
  };

  // ✅ FIX for NaN: This function now correctly parses prices
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-page-layout">
      {/* --- LEFT COLUMN: MAIN CART --- */}
      <div className="shopping-cart-container">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <span className="price-header">Price</span>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <h3>Your Brrrgrrr Cart is empty.</h3>
            <p>Your Shopping Cart lives to serve. Give it purpose — fill it with delicious burgers, drinks, and more.</p>
            <Link to="/menu" className="continue-shopping-btn">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="item-stock-status">Freshly Made</p>
                  <div className="cart-item-actions">
                    <div className="quantity-selector">
                      <button onClick={() => handleUpdateQuantity(item, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item, 1)}>+</button>
                    </div>
                    <span className="action-divider">|</span>
                    <button onClick={() => handleRemoveItem(item)} className="action-link">Delete</button>
                    <span className="action-divider">|</span>
                    <button className="action-link">Save for later</button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <p>${( (typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price) * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- RIGHT COLUMN: SIDEBAR --- */}
      <div className="cart-sidebar">
        {cartItems.length > 0 && (
          <div className="order-summary-container">
            <div className="subtotal-info">
              <span>Subtotal ({totalItems} items):</span>
              <span className="subtotal-price">${calculateSubtotal()}</span>
            </div>
            <button className="proceed-to-buy-btn">Proceed to Buy</button>
          </div>
        )}

        {suggestedItems.length > 0 && (
          <div className="suggestions-section">
            <h4>You might also like</h4>
            {suggestedItems.map(item => (
              <div key={item.name} className="suggestion-item-card">
                <img src={item.image} alt={item.name} onClick={() => navigate(`/product/${encodeURIComponent(item.name)}`)}/>
                <div className="suggestion-item-info">
                  <span onClick={() => navigate(`/product/${encodeURIComponent(item.name)}`)}>{item.name}</span>
                  {/* This button requires the `addToCart` prop from App.jsx */}
                  <button onClick={() => addToCart ? addToCart(item) : alert('Functionality not connected.')}>Add</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
