// src/components/Header.jsx
import React, { useState } from 'react';

function Header({ onSearchChange }) {
  // localSearchTerm state is used for the input field's value
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  // When the input changes, update local state and pass the value up to App.jsx
  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
    onSearchChange(e.target.value); // This calls the setSearchTerm function from App.jsx
  };

  return (
    <header className="bg-green-700 py-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="text-2xl font-semibold text-white">Price Kompare</div>
        <input
          type="text"
          id="searchInput"
          className="p-2 rounded-md w-full sm:w-64 mt-2 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder="Search for a product..."
          value={localSearchTerm} // Controlled component: input value tied to state
          onChange={handleInputChange} // Update state on change
        />
        <nav className="mt-2 sm:mt-0">
          <a href="#" className="mx-2 text-white font-medium hover:text-green-200 transition duration-200">Deals</a>
          <a href="#" className="mx-2 text-white font-medium hover:text-green-200 transition duration-200">Stores</a>
          <a href="#" className="mx-2 text-white font-medium hover:text-green-200 transition duration-200">Categories</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;