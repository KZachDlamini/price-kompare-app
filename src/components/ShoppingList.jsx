// src/components/ShoppingList.jsx
import React from 'react';

// Make sure onUpdateQuantity is destructured from props
function ShoppingList({ items, onRemoveItem, onClearList, onUpdateQuantity }) {
  const calculateTotalEstimate = () => {
    if (!Array.isArray(items)) {
      return '0.00';
    }
    // Adjusted calculation to use the first store's price for simplicity in shopping list
    return items.reduce((total, item) => total + (item.product.stores[0] ? parseFloat(item.product.stores[0].price.replace("R", "")) * item.quantity : 0), 0).toFixed(2);
  };

  const handleComparePrices = (product) => {
    alert(`Comparing prices for ${product.name}... (Feature to be implemented)`);
    console.log('Comparing prices for:', product);
  };

  return (
    <section className="shopping-list-section bg-white py-8 mt-10 border-t border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Your Shopping List</h2>
        <ul id="shopping-list" className="list-none p-0 mb-6">
          {items && items.length === 0 ? (
            <p className="text-sm sm:text-base text-gray-600">Your list is empty. Add some products!</p>
          ) : (
            items && items.map(item => (
              <li key={item.product.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center mb-2 sm:mb-0">
                  <span className="text-base sm:text-lg text-gray-700 mr-4">
                    {item.product.name}
                  </span>
                  {/* Quantity Controls - NEW ADDITION */}
                  <div className="flex items-center gap-1 border border-gray-300 rounded-md">
                    <button
                      className="text-gray-600 px-2 py-1 hover:bg-gray-100 transition duration-200"
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      className="text-gray-600 px-2 py-1 hover:bg-gray-100 transition duration-200"
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

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