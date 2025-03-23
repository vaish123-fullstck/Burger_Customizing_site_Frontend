import React, { useState } from "react";
import { Link } from "react-router-dom";
import { menuCategories } from "./menuData"; // Import menu data
import "./Menu.css"; // Import styles

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(menuCategories)[0]); // Default to first category
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

  return (
    <div className="menu-layout">
      {/* Left Panel: Category List */}
      <div className="menu-container">
        <h2>Categories</h2>
        <div className="menu-categories">
          {Object.keys(menuCategories).map((category) => (
            <div
              key={category}
              className={`menu-category ${selectedCategory === category ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedProduct(null); // Reset product when switching categories
              }}
            >
              <img src={menuCategories[category].image} alt={category} className="menu-category-icon" />
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Dynamic View */}
      <div className="menu-items">
        {selectedProduct ? (
          // Product Details View (Corrected Layout)
          <div className="product-details">
            {/* Left Side: Image & Quantity */}
            <div className="product-image-container">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="enlarged-product-image" />

              {/* Quantity BELOW image */}
              <div className="quantity-control">
                <button onClick={() => setSelectedProduct({ ...selectedProduct, quantity: Math.max(1, (selectedProduct.quantity || 1) - 1) })}>-</button>
                <span>{selectedProduct.quantity || 1}</span>
                <button onClick={() => setSelectedProduct({ ...selectedProduct, quantity: (selectedProduct.quantity || 1) + 1 })}>+</button>
              </div>
            </div>

            {/* Right Side: Product Name & Add to Cart */}
            <div className="product-info">
              <h2 className="product-name">{selectedProduct.name}</h2>
              <p className="product-description">
                {selectedProduct.description || "No description available."}
              </p>
              
              <div className="add-to-cart">
                <button onClick={() => console.log(`${selectedProduct.name} added to cart with quantity ${selectedProduct.quantity || 1}`)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Category Products Grid View
          <>
            <h2>{selectedCategory}</h2>
            <div className="menu-item-grid">
              {menuCategories[selectedCategory].items.map((item) => (
                <div
                  key={item.name}
                  className="menu-item"
                  onClick={() => setSelectedProduct({ ...item, quantity: 1 })} // Reset quantity when selecting a product
                >
                  <h3 className="menu-item-name">{item.name}</h3>
                  <img src={item.image} alt={item.name} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
