// src/components/SearchPopup.jsx
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function SearchPopup({ isOpen, onClose, products, onAddToList }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [popularDeals, setPopularDeals] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemAdding, setItemAdding] = useState(null);
  const quantityInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (itemAdding && quantityInputRef.current && !quantityInputRef.current.contains(event.target)) {
        setItemAdding(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [itemAdding]);

  useEffect(() => {
    if (itemAdding && quantityInputRef.current) {
      quantityInputRef.current.focus();
    }
  }, [itemAdding]);


  useEffect(() => {
    if (isOpen) {
      const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
      setPopularDeals(shuffledProducts.slice(0, 5));

      setSearchTerm('');
      setSearchResults([]);
      setItemAdding(null);
    }
  }, [isOpen, products]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true);
      const delayDebounceFn = setTimeout(() => {
        const filteredResults = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [searchTerm, products]);

  if (!isOpen) return null;

  const handleAddButtonClick = (product) => {
    setItemAdding({ id: product.id, quantity: 1, product: product });
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10) || 1);
    setItemAdding(prev => ({ ...prev, quantity: newQuantity }));
  };

  const handleConfirmAdd = () => {
    if (itemAdding) {
      onAddToList(itemAdding.product, itemAdding.quantity);
      setItemAdding(null);
    }
  };

  const handleCancelAdd = () => {
    setItemAdding(null);
  };

  const renderAddControl = (product) => {
    if (itemAdding && itemAdding.id === product.id) {
      return (
        <div ref={quantityInputRef} className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md shadow-inner">
          <input
            type="number"
            min="1"
            value={itemAdding.quantity}
            onChange={handleQuantityChange}
            className="w-16 text-center border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
          <button
            onClick={handleConfirmAdd}
            className="px-2 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-700 transition duration-200 text-sm" // <--- Changed to orange-500
          >
            Add
          </button>
          <button
            onClick={handleCancelAdd}
            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 text-sm"
          >
            Cancel
          </button>
        </div>
      );
    } else {
      return (
        <button
          onClick={() => handleAddButtonClick(product)}
          className="ml-2 w-8 h-8 flex items-center justify-center bg-orange-500 text-white text-xl font-bold rounded-full hover:bg-orange-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500" // <--- Changed to orange-500
          aria-label={`Add ${product.name} to list`}
        >
          +
        </button>
      );
    }
  };

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-[9998]"
        aria-hidden="true"
        onClick={onClose}
      ></div>

      {/* Popup Content */}
      <div className="fixed inset-0 flex items-start justify-center z-[9999] p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-xl relative flex flex-col h-[90vh] sm:h-[80vh] animate-fade-in-down">
          {/* Search Input within the Popup */}
          <div className="p-4 border-b border-gray-200 flex items-center">
            <input
              type="text"
              className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              placeholder="Search products or brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <button
              onClick={onClose}
              className="ml-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Content Area: Popular Deals or Search Results */}
          <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
            {isLoading && <p className="text-center text-gray-500 py-4">Searching...</p>}
            {searchTerm.length > 0 && searchResults.length === 0 && !isLoading && (
              <p className="text-center text-gray-500 py-4">No results found for "{searchTerm}".</p>
            )}

            {searchTerm.length === 0 ? (
              // Display Popular Deals when search term is empty
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Popular Deals</h3>
                {popularDeals.length > 0 ? (
                  <ul className="space-y-3">
                    {popularDeals.map(deal => (
                      <li key={deal.id} className="p-3 bg-gray-50 rounded-md border border-gray-100 flex justify-between items-center text-gray-700">
                        <div>
                          <p className="font-medium">{deal.name}</p>
                          <p className="text-sm text-gray-500">{deal.brand || deal.store}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                           {deal.price && <span className="font-bold text-orange-500">{deal.price}</span>}
                           {renderAddControl(deal)}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No popular deals available at the moment.</p>
                )}
              </div>
            ) : (
              // Display Search Results when search term is not empty
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Search Results for "{searchTerm}"</h3>
                <ul className="space-y-3">
                  {searchResults.map(product => (
                    <li key={product.id} className="p-3 bg-gray-50 rounded-md border border-gray-100 flex justify-between items-center text-gray-700">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                         {product.stores && product.stores.length > 0 &&
                           <span className="font-bold text-gray-800">{product.stores[0].price}</span>
                         }
                         {renderAddControl(product)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
    , document.getElementById('modal-root')
  );
}

export default SearchPopup;