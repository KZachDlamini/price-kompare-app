// src/components/ProductCard.jsx
import React, { useState } from 'react';

function ProductCard({ product, onAddToList }) {
  // State to manage the quantity for this specific product card
  const [quantity, setQuantity] = useState(1);

  // Function to determine the cheapest store for display
  const cheapestStore = product.stores.reduce((min, s) => {
    const price = parseFloat(s.price.replace("R", ""));
    // Ensure initial min.price is parsed correctly, or set to Infinity
    const currentMinPrice = min ? parseFloat(min.price.replace("R", "")) : Infinity;
    return price < currentMinPrice ? s : min;
  }, product.stores[0] || {name: '', price: 'R0.00'}); // Initialize with first store or a dummy object

  const handleQuantityChange = (change) => {
    setQuantity(prevQty => Math.max(1, prevQty + change)); // Ensure quantity doesn't go below 1
  };

  const handleAddClick = () => {
    onAddToList(product, quantity); // Call the function passed from App.jsx
    setQuantity(1); // Reset quantity in the card after adding to list
  };

  return (
    <div className="product-card border border-gray-200 p-4 rounded-lg bg-white shadow-sm flex flex-col justify-between transform transition duration-300 hover:shadow-md hover:-translate-y-1">
      <span className="category text-xs font-semibold bg-green-100 text-green-700 py-1 px-2 rounded-md inline-block mb-2">
        {product.category}
      </span>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-1">
        <strong className="font-medium">Brand:</strong> {product.brand}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong className="font-medium">Size:</strong> {product.size}
      </p>

      <ul className="list-disc list-inside text-sm text-gray-700 mb-3">
        {product.stores.map((s, index) => (
          <li key={index} className={s.name === cheapestStore.name ? 'font-bold text-green-600' : ''}>
            {s.name}: <strong>{s.price}</strong>
          </li>
        ))}
      </ul>

      <div className="quantity-selector flex items-center gap-2 mb-3">
        <button
          className="qty-btn bg-green-100 text-green-700 font-bold py-1 px-3 rounded-md hover:bg-green-200 transition duration-200"
          onClick={() => handleQuantityChange(-1)}
        >
          −
        </button>
        <span className="text-lg font-medium w-6 text-center">{quantity}</span>
        <button
          className="qty-btn bg-green-100 text-green-700 font-bold py-1 px-3 rounded-md hover:bg-green-200 transition duration-200"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
      </div>
      <button
        className="add-btn w-full py-2 bg-green-700 text-white rounded-md font-medium hover:bg-green-600 transition duration-300"
        onClick={handleAddClick}
      >
        Add to List
      </button>
    </div>
  );
}

export default ProductCard;