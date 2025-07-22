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
  {
    id: 1,
    name: 'Milk',
    category: 'Dairy',
    brand: 'DairyDelight',
    size: '1 Litre',
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Milk',
    stores: [
      { name: 'Pick n Pay', price: 'R28.99' },
      { name: 'Checkers', price: 'R29.50' },
      { name: 'Spar', price: 'R27.80' }
    ]
  },
  {
    id: 2,
    name: 'White Bread',
    category: 'Bakery',
    brand: 'BakeGood',
    size: '700g Loaf',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Bread',
    stores: [
      { name: 'Checkers', price: 'R15.50' },
      { name: 'Shoprite', price: 'R14.99' }
    ]
  },
  {
    id: 3,
    name: 'Eggs',
    category: 'Eggs',
    brand: 'FarmFresh',
    size: 'Dozen Large',
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Eggs',
    stores: [
      { name: 'Shoprite', price: 'R35.00' },
      { name: 'Woolworths', price: 'R38.00' },
      { name: 'Pick n Pay', price: 'R34.50' }
    ]
  },
  {
    id: 4,
    name: 'Apples',
    category: 'Fruits & Veg',
    brand: 'OrchardBest',
    size: '1kg Bag',
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Apples',
    stores: [
      { name: 'Woolworths', price: 'R22.00' },
      { name: 'Checkers', price: 'R21.50' }
    ]
  },
  { // <--- This opening curly brace is correct here
    id: 5,
    name: 'Dishwashing Liquid',
    category: 'Cleaning',
    brand: 'SparkleClean',
    size: '750ml',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Dishwash', // <-- REMOVED THE CLOSING CURLY BRACE HERE
    stores: [
      { name: 'Makro', price: 'R42.99' },
      { name: 'Shoprite', price: 'R43.50' }
    ]
  }, // <--- Correct closing brace for product 5
  {
    id: 6,
    name: 'Rice',
    category: 'Staples',
    brand: 'GrainGuru',
    size: '5kg',
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Rice',
    stores: [
      { name: 'Spar', price: 'R69.99' },
      { name: 'Pick n Pay', price: 'R71.00' }
    ]
  },
  {
    id: 7,
    name: 'Yoghurt',
    category: 'Dairy',
    brand: 'CreamyDelight',
    size: '175g',
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Yoghurt',
    stores: [
      { name: 'Pick n Pay', price: 'R12.00' },
      { name: 'Woolworths', price: 'R13.50' }
    ]
  },
  {
    id: 8,
    name: 'Croissant',
    category: 'Bakery',
    brand: 'FrenchBake',
    size: 'Each',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Croissant',
    stores: [
      { name: 'Woolworths', price: 'R8.50' },
      { name: 'Checkers', price: 'R9.00' }
    ]
  },
  {
    id: 9,
    name: 'Brown Eggs',
    category: 'Eggs',
    brand: 'EcoFarm',
    size: 'Dozen Medium',
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Brown+Eggs',
    stores: [
      { name: 'Checkers', price: 'R37.50' },
      { name: 'Spar', price: 'R36.90' }
    ]
  },
  {
    id: 10,
    name: 'Bananas',
    category: 'Fruits & Veg',
    brand: 'TropicalHarvest',
    size: '1kg Bag',
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Bananas',
    stores: [
      { name: 'Shoprite', price: 'R18.00' },
      { name: 'Pick n Pay', price: 'R19.00' }
    ]
  },
  {
    id: 11,
    name: 'Laundry Detergent',
    category: 'Cleaning',
    brand: 'CleanWave',
    size: '2 Litre',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Detergent',
    stores: [
      { name: 'Makro', price: 'R120.00' },
      { name: 'Woolworths', price: 'R125.00' }
    ]
  },
  {
    id: 12,
    name: 'Pasta',
    category: 'Staples',
    brand: 'Italiano',
    size: '500g',
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Pasta',
    stores: [
      { name: 'Spar', price: 'R25.00' },
      { name: 'Checkers', price: 'R24.50' }
    ]
  },
  {
    id: 13,
    name: 'Cheddar Cheese',
    category: 'Dairy',
    brand: 'CheeseKing',
    size: '250g Block',
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Cheese',
    stores: [
      { name: 'Pick n Pay', price: 'R55.00' },
      { name: 'Woolworths', price: 'R58.00' }
    ]
  }, // <-- ADDED THIS COMMA FOR CONSISTENCY (optional, but good practice)
]; // <-- THIS IS THE MISSING CLOSING BRACKET AND SEMICOLON


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