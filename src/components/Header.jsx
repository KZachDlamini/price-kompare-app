// src/components/Header.jsx
import React, { useState } from 'react';
import logo from '../assets/price-compare-logo.png'; // <--- IMPORT YOUR LOGO HERE

function Header({ onSearchChange }) {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <header className="bg-green-700 py-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
        {/* Replace the text with your logo */}
        <div className="flex items-center mb-2 sm:mb-0"> {/* Added flex and items-center for alignment */}
          <img src={logo} alt="Price Kompare Logo" className="h-8 mr-2" /> {/* Adjust h-32 and mr-2 as needed */}
          <span className="text-2xl font-semibold text-white hidden sm:block">Price Kompare</span> {/* Optionally keep text for larger screens, or remove */}
        </div>

        <input
          type="text"
          id="searchInput"
          className="p-2 rounded-md w-full sm:w-64 mt-2 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder="Search for a product..."
          value={localSearchTerm}
          onChange={handleInputChange}
        />
        <nav className="mt-3 sm:mt-0 flex flex-wrap justify-center">
          <a href="#" className="mx-2 text-white font-medium hover:text-green-200 transition duration-200 text-sm sm:text-base">Deals</a>
          <a href="#" className="mx-2 text-white font-medium hover:text-green-200 transition duration-200 text-sm sm:text-base">Stores</a>
          <a href="#" className="mx-2 text-white font-medium hover:text-green-200 transition duration-200 text-sm sm:text-base">Categories</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;