import React, { useState } from "react";
import { menuCategories } from "./menuData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Menu.css";

export default function Menu({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(menuCategories)[0]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    toast(`${selectedProduct.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      className: "custom-toast",
    });
  };

  const relatedProducts = selectedProduct
    ? menuCategories[selectedCategory].items.filter((item) => item.name !== selectedProduct.name)
    : [];

  return (
    <div className="menu-layout">
      <ToastContainer />
      <div className="menu-container">
        <h2>Categories</h2>
        <div className="menu-categories">
          {Object.keys(menuCategories).map((category) => (
            <div
              key={category}
              className={`menu-category ${selectedCategory === category ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedProduct(null); // Reset when category changes
              }}
            >
              <img src={menuCategories[category].image} alt={category} className="menu-category-icon" />
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-items">
        {selectedProduct ? (
          <div className="product-details">
            
            <div className="product-image-container">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="enlarged-product-image" />
              <div className="quantity-control">
                <button
                  onClick={() =>
                    setSelectedProduct({
                      ...selectedProduct,
                      quantity: Math.max(1, (selectedProduct.quantity || 1) - 1),
                    })
                  }
                >
                  -
                </button>
                <span>{selectedProduct.quantity || 1}</span>
                <button
                  onClick={() =>
                    setSelectedProduct({
                      ...selectedProduct,
                      quantity: (selectedProduct.quantity || 1) + 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-info">
              <h2 className="product-name">{selectedProduct.name}</h2>
              <p className="product-description">
                {selectedProduct.description || "No description available."}
              </p>
              <p className="product-price">Price: {selectedProduct.price}</p>
              <div className="add-to-cart">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>

            {/* ✅ Related products */}
            {relatedProducts.length > 0 && (
              <div className="related-products">
                <h3>Related Items in {selectedCategory}</h3>
                <div className="menu-item-grid">
                  {relatedProducts.map((item) => (
                    <div
                      key={item.name}
                      className="menu-item"
                      onClick={() => setSelectedProduct({ ...item, quantity: 1 })}
                    >
                      <h4 className="menu-item-name">{item.name}</h4>
                      <img src={item.image} alt={item.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <h2>{selectedCategory}</h2>
            <div className="menu-item-grid">
              {menuCategories[selectedCategory].items.map((item) => (
                <div
                  key={item.name}
                  className="menu-item"
                  onClick={() => setSelectedProduct({ ...item, quantity: 1 })}
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
