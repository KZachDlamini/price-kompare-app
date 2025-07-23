// src/components/Header.jsx
import React, { useState } from 'react'; // Import useState
import logo from '../assets/price-compare-logo.png'; // Make sure this path to your logo is correct

// Destructure onOpenSearchPopup from the props
function Header({ onSearchChange, onOpenSearchPopup }) {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  // State to keep track of the currently active navigation link
  const [activeNavLink, setActiveNavLink] = useState('Deals'); // 'Deals' is active by default

  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  // Function to handle navigation link clicks and set the active state
  const handleNavLinkClick = (linkName) => {
    setActiveNavLink(linkName);
    // In a real application, you might also want to trigger routing here
    // For example, if using React Router: navigate(`/${linkName.toLowerCase()}`);
  };

  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center mb-2 sm:mb-0">
          {/* Ensure the logo path is correct */}
          <img src={logo} alt="Price Kompare Logo" className="h-8 mr-2" /> {/* Kept h-8 as per your code */}
        </div>

        {/* The new Search Button */}
        <button
          type="button"
          onClick={onOpenSearchPopup} // This correctly calls the prop function
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

        {/* Navigation links with conditional active state styling */}
        <nav className="mt-3 sm:mt-0 flex flex-wrap justify-start">
          <a
            href="#"
            className={`mx-2 font-bold hover:text-blue-700 hover:bg-blue-100 hover:rounded-md transition duration-200 text-sm sm:text-base px-2 py-1
              ${activeNavLink === 'Deals' ? 'bg-blue-100 text-blue-700 rounded-md' : 'text-blue-900'}` // Conditional styling for 'Deals'
            }
            onClick={() => handleNavLinkClick('Deals')} // Set 'Deals' as active on click
          >
            Deals
          </a>
          <a
            href="#"
            className={`mx-2 font-bold hover:text-blue-700 hover:bg-blue-100 hover:rounded-md transition duration-200 text-sm sm:text-base px-2 py-1
              ${activeNavLink === 'Stores' ? 'bg-blue-100 text-blue-700 rounded-md' : 'text-blue-900'}` // Conditional styling for 'Stores'
            }
            onClick={() => handleNavLinkClick('Stores')} // Set 'Stores' as active on click
          >
            Stores
          </a>
          <a
            href="#"
            className={`mx-2 font-bold hover:text-blue-700 hover:bg-blue-100 hover:rounded-md transition duration-200 text-sm sm:text-base px-2 py-1
              ${activeNavLink === 'Categories' ? 'bg-blue-100 text-blue-700 rounded-md' : 'text-blue-900'}` // Conditional styling for 'Categories'
            }
            onClick={() => handleNavLinkClick('Categories')} // Set 'Categories' as active on click
          >
            Categories
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;