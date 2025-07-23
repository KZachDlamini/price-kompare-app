// src/components/ProductsSection.jsx
import React, { useRef } from 'react'; // Import useRef
import ProductCard from './ProductCard'; // Ensure ProductCard is imported

function ProductsSection({ products, selectedCategory, onCategoryChange, onAddToList }) {
  // Use the categories array as defined in your provided code
  const categories = ["All", "Dairy", "Bakery", "Eggs", "Fruits & Veg", "Cleaning", "Staples"];
  const scrollContainerRef = useRef(null); // Create a ref for the scrollable product container

  // Function to scroll carousel left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth * 0.8, // Scroll by 80% of container width
        behavior: 'smooth'
      });
    }
  };

  // Function to scroll carousel right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth * 0.8, // Scroll by 80% of container width
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="products py-10 bg-gray-50 relative"> {/* Added relative for button positioning */}
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">Popular Deals</h2>

        {/* Desktop Category Buttons */}
        <div className="hidden md:flex gap-3 flex-wrap justify-center mb-6">
          {categories.map(category => (
            <button
              key={category}
              className={`py-2 px-4 border border-gray-300 rounded-md font-medium transition duration-200 whitespace-nowrap
                ${selectedCategory === category ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Category Dropdown */}
        <div className="md:hidden mb-6">
          <label htmlFor="categoryFilter" className="block text-base font-medium text-gray-700 mb-2">Filter by Category:</label>
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

        {/* Product Carousel Container */}
        <div className="relative"> {/* Outer relative container for navigation buttons */}
          {/* Navigation Buttons (Hidden on mobile, flex on md and up) */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 bg-opacity-70 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md z-10 items-center justify-center w-10 h-10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            aria-label="Scroll products left"
          >
            &lt;
          </button>
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 bg-opacity-70 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md z-10 items-center justify-center w-10 h-10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            aria-label="Scroll products right"
          >
            &gt;
          </button>

          <div
            ref={scrollContainerRef} // Attach the ref here
            className="flex overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar
                       space-x-4 px-2" // space-x-4 for gap, px-2 for padding at ends
          >
            {products.length === 0 ? (
              <p className="flex-shrink-0 w-full text-center text-base sm:text-lg text-gray-600 py-10">No products found for your selection.</p>
            ) : (
              products.map(product => (
                <div key={product.id} className="flex-shrink-0 snap-start w-80 sm:w-96 md:w-80 lg:w-72 xl:w-64">
                  <ProductCard product={product} onAddToList={onAddToList} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Custom CSS to hide scrollbar (optional but improves aesthetics) */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
}

export default ProductsSection;