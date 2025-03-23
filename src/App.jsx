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

export default function App() {
  const [cartCount, setCartCount] = useState(1);

  useEffect(() => {
    console.log("Updated cartCount:", cartCount);
  }, [cartCount]);

  return (
    <Router>
      <div>
        {/* Navbar now receives the updated cart count */}
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
            <Route path="/menu" element={<Menu />} />

            {/* Product Details Route */}
            <Route
              path="/product/:productName"
              element={<ProductDetails cartCount={cartCount} setCartCount={setCartCount} />}
            />


            {/* Customize Route */}
            <Route path="/customize" element={<BurgerCustomizer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
