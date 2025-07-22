// src/App.jsx
import React, { useState, useEffect } from 'react';
import './index.css'; // Make sure your main CSS is imported

// Import your product data
import { products as allProductsData } from './data/products';

// Import your component files (we will create these next)
import Header from './components/Header';
import Hero from './components/Hero';
import StoresSection from './components/StoresSection';
import ProductsSection from './components/ProductsSection';
import ShoppingList from './components/ShoppingList';
import Footer from './components/Footer';

function App() {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState('All');
  // State for products displayed after filtering
  const [filteredProducts, setFilteredProducts] = useState(allProductsData);
  // State for items in the user's shopping list
  const [shoppingListItems, setShoppingListItems] = useState([]);

  // This useEffect hook runs whenever searchTerm or selectedCategory changes.
  // It re-filters the products based on the current search and category.
  useEffect(() => {
    const applyFilters = () => {
      let tempProducts = allProductsData; // Start with all products

      // Apply search filter
      if (searchTerm) {
        tempProducts = tempProducts.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedCategory !== 'All') {
        tempProducts = tempProducts.filter(p => p.category === selectedCategory);
      }
      setFilteredProducts(tempProducts); // Update the state with filtered products
    };

    applyFilters();
  }, [searchTerm, selectedCategory]); // Dependencies: re-run when these states change

  // Function to add a product to the shopping list
  const addToShoppingList = (product, quantity) => {
    setShoppingListItems(prevItems => {
      // Check if the product is already in the list
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);

      if (existingItemIndex > -1) {
        // If exists, create a new array with updated quantity for that item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // If new, add it to the list
        return [...prevItems, { product, quantity }];
      }
    });
  };

  // Function to remove a product from the shopping list
  const removeFromShoppingList = (productId) => {
    setShoppingListItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Function to clear the entire shopping list
  const clearShoppingList = () => {
    setShoppingListItems([]);
  };

  return (
    // min-h-screen makes sure the div takes at least the full height of the viewport
    // flex flex-col makes it a flex container with items arranged vertically,
    // allowing the main content to grow and push the footer to the bottom.
    <div className="min-h-screen flex flex-col">
      {/* Header component will receive a function to update the search term */}
      <Header onSearchChange={setSearchTerm} />
      {/* Hero component will also receive a function to update the search term */}
      <Hero onSearchChange={setSearchTerm} />
      {/* main flex-grow allows this section to take up available space, pushing footer down */}
      <main className="flex-grow">
        <StoresSection />
        {/* ProductsSection receives products, current category, and functions to change them or add to list */}
        <ProductsSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddToList={addToShoppingList}
        />
        {/* ShoppingList receives the items, and functions to remove/clear them */}
        <ShoppingList
          items={shoppingListItems}
          onRemoveItem={removeFromShoppingList}
          onClearList={clearShoppingList}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;