// src/components/StoresSection.jsx
import React from 'react';

function StoresSection() {
  const stores = ["Pick n Pay", "Checkers", "Shoprite", "Spar", "Makro", "Woolworths"];

  return (
    <section className="stores py-10 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">Popular Stores</h2> {/* Adjusted text size */}
        <div className="store-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          {stores.map((store, index) => (
            <div key={index} className="store bg-gray-100 p-4 rounded-lg font-medium text-green-700 shadow-sm hover:bg-gray-200 transition duration-200">
              {store}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoresSection;