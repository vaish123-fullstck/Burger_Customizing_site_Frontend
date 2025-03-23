import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { menuCategories } from "./menuData"; // Import menu data
import "../styles/ProductDetailsStyles.css";

export default function ProductDetails({ cartCount,setCartCount }) {
  const { productName } = useParams();
  const navigate = useNavigate();

  console.log(props); // Check what is being passed to ProductDetails

  

  // Find the product in the menu data
  const product = Object.values(menuCategories)
    .flatMap((category) => category.items)
    .find((item) => item.name === decodeURIComponent(productName));

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      console.log("Selected Product:", product);
      console.log("Product Ingredients:", product.ingredients || "No ingredients found");
    }
  }, [product]);
  useEffect(() => {
    console.log("ProductDetails component re-rendered");
  }, [product]);


  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleBackToCategories = () => navigate("/menu");

  const handleAddToCart = () => {
    console.log("Adding to cart. Current cartCount:", cartCount);
    setCartCount((prevCount) => prevCount + quantity); // Use the previous count to update state
  };

  if (!product) {
    return <div className="error-message">Product not found.</div>;
  }

  return (
    <div className="product-details">
      {/* Left Side - Product Image & Quantity Control */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="enlarged-product-image"
          onError={(e) => (e.target.style.display = "none")}
        />

        {/* Quantity Controls BELOW the image */}
        <div className="quantity-control">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      </div>

      {/* Right Side - Product Name, Description & Add to Cart */}
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="menu-item-price">${product.pricefixed(2)}</p>
        <p className="product-description">
          {product.description || "No description available."}
        </p>
        <button
          className="add-to-cart"
          onClick={handleAddToCart}  // Ensure this function is called
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
