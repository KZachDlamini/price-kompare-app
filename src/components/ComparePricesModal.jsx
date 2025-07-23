// src/components/ComparePricesModal.jsx
import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM for portals

function ComparePricesModal({ product, onClose }) {
  // Don't render if no product is provided
  if (!product) {
    return null;
  }

  // Determine the cheapest store for highlighting
  const cheapestStore = product.stores.reduce((min, s) => {
    const price = parseFloat(s.price.replace("R", ""));
    const currentMinPrice = min ? parseFloat(min.price.replace("R", "")) : Infinity;
    return price < currentMinPrice ? s : min;
  }, product.stores[0] || { name: '', price: 'R0.00' }); // Fallback for safety

  // Get the modal root element
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error("Modal root element not found! Ensure there's a <div id='modal-root'> in your index.html.");
    return null;
  }

  // Use ReactDOM.createPortal to render the modal content into the modal-root div
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Prices for {product.name}
        </h3>

        <div className="mb-4">
          <p className="text-gray-700 text-sm mb-2">
            <strong className="font-semibold">Brand:</strong> {product.brand}
          </p>
          <p className="text-gray-700 text-sm">
            <strong className="font-semibold">Size:</strong> {product.size}
          </p>
        </div>

        <ul className="space-y-3 mb-6">
          {product.stores.length === 0 ? (
            <li className="text-gray-600 italic">No price information available for this product.</li>
          ) : (
            product.stores.map((store, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg border ${
                  store.name === cheapestStore.name
                    ? 'border-green-500 bg-green-50 text-green-800 font-bold'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <span className="text-lg">{store.name}</span>
                <span className="text-lg">{store.price}</span>
              </li>
            ))
          )}
        </ul>

        {product.stores.length > 0 && (
          <p className="text-center text-lg font-bold text-green-700 mt-4">
            Cheapest at {cheapestStore.name}: {cheapestStore.price}
          </p>
        )}
      </div>
    </div>,
    modalRoot // Render into modalRoot
  );
}

export default ComparePricesModal;