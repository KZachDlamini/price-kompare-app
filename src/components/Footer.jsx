// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 py-6 text-center text-xs sm:text-sm text-gray-600 border-t border-gray-200 mt-auto"> {/* Adjusted text size */}
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Price Kompare by <a href="https://www.kzdigitalworks.co.za" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">KZ Digital Works</a></p>
      </div>
    </footer>
  );
}

export default Footer;