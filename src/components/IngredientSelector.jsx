import React from "react";
import "../styles/IngredientSelectorStyles.css";

export default function IngredientSelector({ ingredients = [] }) {
  if (!ingredients.length) {
    return <p>No ingredients available.</p>;
  }

  return (
    <div className="ingredients-container">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-item">
          <p>{ingredient}</p>
        </div>
      ))}
    </div>
  );
}
