// src/components/ShoppingList.jsx
import React from 'react';

function ShoppingList({ items, onRemoveItem, onClearList }) {
  const calculateTotalEstimate = () => {
    // ADD THIS CHECK: If items is undefined or not an array, return 0
    if (!Array.isArray(items)) {
      return '0.00'; // Or handle error appropriately
    }
    // Original calculation
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
  };

  const handleComparePrices = (product) => { /* ... */ };

  return (
    <section className="shopping-list-section bg-white py-8 mt-10 border-t border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Your Shopping List</h2>
        <ul id="shopping-list" className="list-none p-0 mb-6">
          {items && items.length === 0 ? ( {/* <-- ADDED 'items &&' here for safety */}
            <p className="text-sm sm:text-base text-gray-600">Your list is empty. Add some products!</p>
          ) : (
            // ADD THIS CHECK: Render only if items is an array
            items && items.map(item => (
              <li key={item.product.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0">
                <span className="text-base sm:text-lg text-gray-700 mb-2 sm:mb-0">
                  {item.product.name} x{item.quantity}
                </span>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <button
                    className="compare-btn bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition duration-200"
                    onClick={() => handleComparePrices(item.product)}
                  >
                    Compare Prices
                  </button>
                  <button
                    className="remove-item text-red-500 hover:text-red-700 transition duration-200"
                    onClick={() => onRemoveItem(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <div id="total-estimate" className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Total Estimate: R{calculateTotalEstimate()}
        </div>
        <button
          id="clear-list"
          className="btn-clear bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 text-sm sm:text-base"
          onClick={onClearList}
        >
          Clear List
        </button>
      </div>
    </section>
  );
}

export default ShoppingList;