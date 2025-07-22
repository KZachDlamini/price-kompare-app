// src/components/ShoppingList.jsx
import React from 'react';

function ShoppingList({ items, onRemoveItem, onClearList }) {
  // Function to calculate the total estimated cost of items in the list
  const calculateTotalEstimate = () => {
    let total = 0;
    items.forEach(item => {
      // Find the cheapest price for each product in the list
      const cheapestPrice = item.product.stores.reduce((min, s) => {
        const price = parseFloat(s.price.replace("R", ""));
        return price < min ? price : min;
      }, Infinity); // Start with an "infinite" price to ensure first comparison works
      total += item.quantity * cheapestPrice;
    });
    return total.toFixed(2); // Format to 2 decimal places
  };

  // Function to show a popup with the cheapest store for an item
  const handleComparePrices = (product) => {
    const cheapest = product.stores.reduce((min, s) => {
      const price = parseFloat(s.price.replace("R", ""));
      // Ensure initial min.price is parsed correctly, or set to Infinity
      const currentMinPrice = min ? parseFloat(min.price.replace("R", "")) : Infinity;
      return price < currentMinPrice ? s : min;
    }, product.stores[0] || {name: '', price: 'R0.00'}); // Initialize with first store or a dummy object

    alert(`Cheapest for ${product.name}: ${cheapest.name} @ R${cheapest.price.toFixed(2)}`);
  };

  return (
    <section className="shopping-list-section bg-white py-8 mt-10 border-t border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Shopping List</h2>
        <ul id="shopping-list" className="list-none p-0 mb-6">
          {items.length === 0 ? (
            <p className="text-gray-600">Your list is empty. Add some products!</p>
          ) : (
            items.map(item => (
              <li key={item.product.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0">
                <span className="text-lg text-gray-700 mb-2 sm:mb-0">
                  {item.product.name} x{item.quantity}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    className="compare-btn bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600 transition duration-200"
                    onClick={() => handleComparePrices(item.product)}
                  >
                    Compare Prices
                  </button>
                  <button
                    className="remove-item text-red-500 text-sm hover:text-red-700 transition duration-200"
                    onClick={() => onRemoveItem(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <div id="total-estimate" className="text-xl font-bold text-gray-800 mb-4">
          Total Estimate: R{calculateTotalEstimate()}
        </div>
        <button
          id="clear-list"
          className="btn-clear bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
          onClick={onClearList}
        >
          Clear List
        </button>
      </div>
    </section>
  );
}

export default ShoppingList;