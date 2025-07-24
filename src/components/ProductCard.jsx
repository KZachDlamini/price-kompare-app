// src/components/ProductCard.jsx
import React, { useState } from 'react';

// Make sure onOpenCompareModal is destructured from props
function ProductCard({ product, onAddToList, onOpenCompareModal }) { // <--- ADD onOpenCompareModal PROP
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

  // <--- NEW: Handler for clicking the product card --->
  const handleCardClick = () => {
    console.log('Product card clicked:', product.name);
    onOpenCompareModal(product);
  };

  return (
    // Outer container: Make it clickable, and ensure internal buttons don't trigger it
    // Added cursor-pointer for visual cue
    <div
      className="product-card border border-gray-200 p-4 rounded-lg bg-white shadow-sm flex flex-col h-full min-h-[350px] justify-between transform transition duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer" // <--- ADD cursor-pointer
      onClick={handleCardClick} // <--- ADD onClick HANDLER
    >
      {/* Ensure click handlers on internal elements stop propagation if they do different actions */}
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
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar mb-3">
        <ul className="list-disc list-inside text-sm text-gray-700">
          {product.stores.map((s, index) => (
            <li key={index} className={s.name === cheapestStore.name ? 'font-bold text-blue-700' : ''}>
              {s.name}: <strong>{s.price}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Quantity Selector and Add to List Button - Pushed to the bottom */}
      <div className="mt-auto">
        <div className="quantity-selector flex items-center justify-center gap-2 mb-3">
          <button
            className="qty-btn bg-blue-900 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200"
            onClick={(e) => { e.stopPropagation(); handleQuantityChange(-1); }} // <--- ADD e.stopPropagation()
          >
            −
          </button>
          <span className="text-lg font-medium w-6 text-center">{quantity}</span>
          <button
            className="qty-btn bg-blue-900 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200"
            onClick={(e) => { e.stopPropagation(); handleQuantityChange(1); }} // <--- ADD e.stopPropagation()
          >
            +
          </button>
        </div>
        <button
          className="add-btn w-full py-2 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-700 transition duration-300"
          onClick={(e) => { e.stopPropagation(); handleAddClick(); }} // <--- ADD e.stopPropagation()
        >
          Add to List
        </button>
      </div>

      {/* Custom CSS for scrollbar if overflow occurs */}
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