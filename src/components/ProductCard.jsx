// src/components/ProductCard.jsx
import React, { useState } from 'react';

function ProductCard({ product, onAddToList }) {
  const [quantity, setQuantity] = useState(1);

  const cheapestStore = product.stores.reduce((min, s) => {
    const price = parseFloat(s.price.replace("R", ""));
    const currentMinPrice = min ? parseFloat(min.price.replace("R", "")) : Infinity;
    return price < currentMinPrice ? s : min;
  }, product.stores[0] || {name: '', price: 'R0.00'});

  const handleQuantityChange = (change) => {
    setQuantity(prevQty => Math.max(1, prevQty + change));
  };

  const handleAddClick = () => {
    onAddToList(product, quantity);
    setQuantity(1);
  };

  return (
    // Outer container: Set it to be a flex column, full height, and a minimum height
    // min-h-[350px] is a good starting point, adjust as needed.
    // h-full ensures it takes the full height available from its parent (the carousel item wrapper)
    <div className="product-card border border-gray-200 p-4 rounded-lg bg-white shadow-sm flex flex-col h-full min-h-[350px] justify-between transform transition duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Category Tag */}
      <span className="category text-xs font-semibold bg-blue-900 text-white py-1 px-2 rounded-md inline-block mb-2">
        {product.category}
      </span>
      {/* Product Name (added line-clamp for consistency) */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
      {/* Brand and Size (added line-clamp for consistency) */}
      <p className="text-sm text-gray-600 mb-1 line-clamp-1">
        <strong className="font-medium">Brand:</strong> {product.brand}
      </p>
      <p className="text-sm text-gray-600 mb-2 line-clamp-1">
        <strong className="font-medium">Size:</strong> {product.size}
      </p>

      {/* Store List - Use flex-grow and overflow to manage variable content */}
      {/* flex-grow pushes remaining content down. overflow-y-auto adds scrollbar if list is too long. */}
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar mb-3">
        <ul className="list-disc list-inside text-sm text-gray-700">
          {product.stores.map((s, index) => (
            <li key={index} className={s.name === cheapestStore.name ? 'font-bold text-blue-700' : ''}>
              {s.name}: <strong>{s.price}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Quantity Selector and Add to List Button - Pushed to the bottom using mt-auto on its container */}
      <div className="mt-auto"> {/* This div ensures these elements stick to the bottom */}
        <div className="quantity-selector flex items-center justify-center gap-2 mb-3">
          <button
            className="qty-btn bg-blue-900 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200"
            onClick={() => handleQuantityChange(-1)}
          >
            −
          </button>
          <span className="text-lg font-medium w-6 text-center">{quantity}</span>
          <button
            className="qty-btn bg-blue-900 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
        <button
          className="add-btn w-full py-2 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-700 transition duration-300"
          onClick={handleAddClick}
        >
          Add to List
        </button>
      </div>

      {/* Custom CSS for scrollbar if overflow occurs (same as before) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}

export default ProductCard;