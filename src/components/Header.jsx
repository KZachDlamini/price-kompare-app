// src/components/Header.jsx
import React, { useState } from 'react';
import logo from '../assets/price-compare-logo.png'; // Make sure this path to your logo is correct

// You need to destructure onOpenSearchPopup from the props here 👇
function Header({ onSearchChange, onOpenSearchPopup }) { // <--- FIXED: onOpenSearchPopup added to props
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between px-4">
        {/* Replace the text with your logo */}
        <div className="flex items-center mb-2 sm:mb-0">
          <img src={logo} alt="Price Kompare Logo" className="h-20 mr-2" /> {/* Adjust h-20 and mr-2 as needed */}
        </div>

        {/* The new Search Button */}
        <button
          type="button"
          onClick={onOpenSearchPopup} // This now correctly calls the prop function
          className="p-2 rounded-md w-full sm:w-64 mt-2 sm:mt-0
                     bg-gray-200 text-gray-700 text-left
                     hover:bg-gray-300 transition duration-200
                     focus:outline-none focus:ring-2 focus:ring-brand-blue
                     cursor-pointer flex items-center justify-between"
        >
          <span>Search products or brands</span>
          {/* Optional: Add a search icon here if desired */}
          {/* <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
        </button>

        {/* Navigation links with updated branding colors */}
        <nav className="mt-3 sm:mt-0 flex flex-wrap justify-start">

          <a href="#" className="mx-2 text-blue-900 font-bold hover:text-blue-700 hover:bg-blue-100 hover:rounded-md transition duration-200 text-sm sm:text-base px-2 py-1">Deals</a>
          <a href="#" className="mx-2 text-blue-900 font-bold hover:text-blue-700 hover:bg-blue-100 hover:rounded-md transition duration-200 text-sm sm:text-base px-2 py-1">Stores</a>
          <a href="#" className="mx-2 text-blue-900 font-bold hover:text-blue-700 hover:bg-blue-100 hover:rounded-md transition duration-200 text-sm sm:text-base px-2 py-1">Categories</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;