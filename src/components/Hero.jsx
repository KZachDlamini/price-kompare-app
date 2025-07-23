// src/components/Hero.jsx
import React, { useState } from 'react'; // <--- CORRECTED LINE

function Hero({ onSearchChange }) {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
    onSearchChange(e.target.value); // Communicate search term to App.jsx
  };

  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Compare Grocery Prices Instantly</h1>
        <p className="text-base sm:text-lg md:text-xl mb-8">Save money by finding the best prices near you.</p>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            className="w-full p-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a product name..."
            value={localSearchTerm}
            onChange={handleInputChange}
          />
          <button className="bg-white text-blue-900 font-bold py-3 px-6 rounded-md hover:bg-gray-100 transition duration-300 shadow-md">
            Compare Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;