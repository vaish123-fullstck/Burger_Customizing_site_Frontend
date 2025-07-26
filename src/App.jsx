import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import burgerImage from "./assets/bigbrrrgrrr.png";
import Carousel from "./components/carousel";
import Footer from "./components/Footer";
import BurgerCustomizer from "./components/BurgerCustomizer";
import Menu from "./components/Menu";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  // ✅ CORRECTED addToCart function
  const addToCart = (productToAdd, quantity = 1) => {
    setCartItems((prevItems) => {
      // Use the product's name as the unique ID for standard items.
      // Custom burgers will have their own unique ID starting with "custom-".
      const itemIdentifier = productToAdd.id || productToAdd.name;

      const existingItem = prevItems.find(
        (item) => (item.id || item.name) === itemIdentifier
      );

      if (existingItem) {
        // If the item already exists, just update its quantity
        return prevItems.map((item) =>
          (item.id || item.name) === itemIdentifier
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If it's a new item, add it to the cart.
        // We also ensure it has a unique 'id' property for use in the cart.
        return [
          ...prevItems,
          { ...productToAdd, id: itemIdentifier, quantity: quantity },
        ];
      }
    });
  };

  // Calculate cart count directly from the cartItems array to avoid errors
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  return (
    <Router>
      <div>
        <Navbar cartCount={cartCount} />
        <div className="content">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <div className="home-page">
                    <div className="home-text">
                      <h1>Try our New</h1>
                    </div>
                    <div className="home-img">
                      <img src={burgerImage} alt="BigDouble Brrrgrrr" />
                    </div>
                    <div className="home-text1">
                      <h1>#DoublePattyBrrrgrrr</h1>
                    </div>
                  </div>
                  <div className="carousel-section">
                    <Carousel />
                  </div>
                  <Footer />
                </>
              }
            />

            {/* Menu Route */}
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />

            {/* Product Details Route - Pass only the addToCart function */}
            <Route
              path="/product/:productName"
              element={<ProductDetails addToCart={addToCart} />}
            />

            {/* Customize Route */}
            <Route
              path="/customize"
              element={<BurgerCustomizer addToCart={addToCart} />}
            />

            {/* Cart Route - This is now correctly wired up */}
            <Route
              path="/cart"
              element={
                <CartPage cartItems={cartItems} setCartItems={setCartItems} />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
