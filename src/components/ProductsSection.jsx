// src/components/ProductsSection.jsx
import React from 'react';
import ProductCard from './ProductCard';

function ProductsSection({ products, selectedCategory, onCategoryChange, onAddToList }) {
  const categories = ["All", "Dairy", "Bakery", "Eggs", "Fruits & Veg", "Cleaning", "Staples"];

  return (
    <section className="products py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">Popular Deals</h2> {/* Adjusted text size */}

        {/* Desktop Category Buttons */}
        <div className="hidden md:flex gap-3 flex-wrap justify-center mb-6">
          {categories.map(category => (
            <button
              key={category}
              className={`py-2 px-4 border border-gray-300 rounded-md font-medium transition duration-200 whitespace-nowrap
                ${selectedCategory === category ? 'bg-green-700 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Category Dropdown */}
        <div className="md:hidden mb-6">
          <label htmlFor="categoryFilter" className="block text-base font-medium text-gray-700 mb-2">Filter by Category:</label> {/* Adjusted text size */}
          <select
            id="categoryFilter"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-base sm:text-lg text-gray-600">No products found for your selection.</p> // Adjusted text size
          ) : (
            products.map(product => (
              <ProductCard key={product.id} product={product} onAddToList={onAddToList} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;