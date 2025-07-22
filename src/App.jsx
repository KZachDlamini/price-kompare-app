// src/App.jsx
import React, { useState, useEffect } from 'react'; // Added useEffect
import Header from './components/Header';
import Hero from './components/Hero';
import StoresSection from './components/StoresSection';
import ProductsSection from './components/ProductsSection';
import ShoppingList from './components/ShoppingList';
import Footer from './components/Footer';

// Dummy data for products (you can expand this later)
const DUMMY_PRODUCTS = [
  { id: 1, name: 'Milk', price: 28.99, store: 'Pick n Pay', category: 'Dairy', imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Milk' },
  { id: 2, name: 'Bread (White)', price: 15.50, store: 'Checkers', category: 'Bakery', imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Bread' },
  { id: 3, name: 'Eggs (Dozen)', price: 35.00, store: 'Shoprite', category: 'Eggs', imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Eggs' },
  { id: 4, name: 'Apples (1kg)', price: 22.00, store: 'Woolworths', category: 'Fruits & Veg', imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Apples' },
  { id: 5, name: 'Dishwashing Liquid', price: 42.99, store: 'Makro', category: 'Cleaning', imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Dishwash' },
  { id: 6, name: 'Rice (5kg)', price: 69.99, store: 'Spar', category: 'Staples', imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Rice' },
  { id: 7, name: 'Yoghurt (175g)', price: 12.00, store: 'Pick n Pay', category: 'Dairy', imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Yoghurt' },
  { id: 8, name: 'Croissant', price: 8.50, store: 'Woolworths', category: 'Bakery', imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Croissant' },
  { id: 9, name: 'Brown Eggs (Dozen)', price: 37.50, store: 'Checkers', category: 'Eggs', imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Brown+Eggs' },
  { id: 10, name: 'Bananas (1kg)', price: 18.00, store: 'Shoprite', category: 'Fruits & Veg', imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Bananas' },
  { id: 11, name: 'Laundry Detergent', price: 120.00, store: 'Makro', category: 'Cleaning', imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Detergent' },
  { id: 12, name: 'Pasta (500g)', price: 25.00, store: 'Spar', category: 'Staples', imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Pasta' },
  { id: 13, name: 'Cheddar Cheese (250g)', price: 55.00, store: 'Pick n Pay', category: 'Dairy', imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Cheese' },
];

function App() {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(DUMMY_PRODUCTS); // New state for filtered products

  // Function to filter products based on search term and category
  const applyFilters = () => {
    let tempProducts = [...DUMMY_PRODUCTS]; // Start with all products

    // Filter by category
    if (selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(tempProducts);
  };

  // Use useEffect to apply filters whenever searchTerm or selectedCategory changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory]); // Re-run effect when these dependencies change


  const handleSearchChange = (term) => {
    setSearchTerm(term);
    // Filtering will happen automatically via useEffect
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Filtering will happen automatically via useEffect
  };

  const handleAddToList = (product) => {
    setShoppingListItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);

      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // If item doesn't exist, add it
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (productId) => {
    setShoppingListItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleClearList = () => {
    setShoppingListItems([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearchChange={handleSearchChange} />
      <Hero onSearchChange={handleSearchChange} /> {/* Pass onSearchChange to Hero as well */}
      <main className="flex-grow">
        <StoresSection />
        <ProductsSection
          products={filteredProducts} // Pass the filtered products
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onAddToList={handleAddToList}
        />
        <ShoppingList
          items={shoppingListItems}
          onRemoveItem={handleRemoveItem}
          onClearList={handleClearList}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;