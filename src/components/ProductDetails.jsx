import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { menuCategories } from "./menuData";
import "../styles/ProductDetailsStyles.css";

export default function ProductDetails({ cartCount, setCartCount }) {
  const { productName } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Get the current product based on URL param
  useEffect(() => {
  console.log("👉 URL param:", productName, decodeURIComponent(productName));
  const name = decodeURIComponent(productName).toLowerCase();
  const allItems = Object.values(menuCategories).flatMap(c => c.items);
  console.log("📦 All product names:", allItems.map(x => x.name));
  const found = allItems.find(item => item.name.toLowerCase() === name);
  console.log("✅ Found product object:", found);
  setProduct(found || null);
  setQuantity(1);
}, [productName]);


  // Get related items from the same category (excluding the product itself)
  useEffect(() => {
  if (!product) return;
  console.log("🔍 Current product:", product.name);
  const categoryKey = Object.keys(menuCategories).find(key =>
    menuCategories[key].items.some(
      item => item.name.toLowerCase() === product.name.toLowerCase()
    )
  );
  console.log("📦 Category found:", categoryKey);
  if (categoryKey) {
    const related = menuCategories[categoryKey].items.filter(
      item => item.name !== product.name
    );
    console.log("🧩 Related items:", related);
    setRelatedItems(related);
  } else {
    console.warn("⚠️ No category matched");
    setRelatedItems([]);
  }
}, [product]);


  const handleAddToCart = () => {
    setCartCount((prev) => prev + quantity);
  };

  const handleRelatedClick = (itemName) => {
    navigate(`/product/${encodeURIComponent(itemName)}`);
  };

  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  return (
    <div className="product-details">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="enlarged-product-image"
        />
        <div className="quantity-control">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{typeof product.price === "string" ? product.price : `₹${product.price}`}</p>
        <p>{product.description || "No description provided."}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      {relatedItems.length > 0 && (
        <div className="related-items-section">
          <h3>Related Items</h3>
          <div className="related-items-container">
            {relatedItems.map((item) => (
              <div
                key={item.name}
                className="related-item-card"
                onClick={() => handleRelatedClick(item.name)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="related-item-image"
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
