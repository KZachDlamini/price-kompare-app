// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StoresSection from './components/StoresSection';
import ProductsSection from './components/ProductsSection';
import ShoppingList from './components/ShoppingList';
import Footer from './components/Footer';
import ComparePricesModal from './components/ComparePricesModal'; // Ensure this is imported
import TotalComparisonModal from './components/TotalComparisonModal'; // Ensure this is imported

// DUMMY_PRODUCTS data (This should be the correct, updated version from our previous steps)
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
  {
    id: 5,
    name: 'Dishwashing Liquid',
    category: 'Cleaning',
    brand: 'SparkleClean',
    size: '750ml',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Dishwash',
    stores: [
      { name: 'Makro', price: 'R42.99' },
      { name: 'Shoprite', price: 'R43.50' }
    ]
  },
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
  },
];


function App() {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(DUMMY_PRODUCTS);

  // State for single product comparison modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // State for total shopping list comparison modal
  const [isTotalCompareModalOpen, setIsTotalCompareModalOpen] = useState(false);
  const [totalComparisonResults, setTotalComparisonResults] = useState([]);

  const applyFilters = () => {
    let tempProducts = [...DUMMY_PRODUCTS];

    if (selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(tempProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory]);


  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToList = (product, quantity = 1) => {
    setShoppingListItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const handleRemoveItem = (productId) => {
    setShoppingListItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleClearList = () => {
    setShoppingListItems([]);
  };

  // Function to update quantity of an item in the shopping list
  const handleUpdateQuantity = (productId, change) => {
    setShoppingListItems(prevItems => {
      return prevItems.map(item => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  // Functions for single product comparison modal
  const handleOpenCompareModal = (product) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
  };
  const handleCloseCompareModal = () => {
    setIsModalOpen(false);
    setSelectedProductForModal(null);
  };

  // Function to handle total shopping list comparison with "out of stock" logic
  const handleCompareAllPrices = () => {
    if (shoppingListItems.length === 0) {
      alert("Your shopping list is empty! Please add some items to compare.");
      return;
    }

    // Get all unique store names from your DUMMY_PRODUCTS
    const allStoreNames = [...new Set(DUMMY_PRODUCTS.flatMap(p => p.stores.map(s => s.name)))];
    const comparisonResults = [];

    // Helper function to find the cheapest overall price for a specific product
    const getCheapestAlternativeForProduct = (productId) => {
      const product = DUMMY_PRODUCTS.find(p => p.id === productId);
      if (!product || product.stores.length === 0) {
        return null; // Product not found or no stores listed
      }
      return product.stores.reduce((cheapest, currentStore) => {
        const currentPrice = parseFloat(currentStore.price.replace("R", ""));
        const cheapestPrice = cheapest ? parseFloat(cheapest.price.replace("R", "")) : Infinity;
        return currentPrice < cheapestPrice ? currentStore : cheapest;
      }, null);
    };

    // Iterate through each unique store
    for (const storeName of allStoreNames) {
      let totalCostForAvailableItems = 0;
      const itemsBreakdown = []; // To store details for each item (available/out of stock)
      let hasUnavailableItems = false; // Flag to indicate if this store is missing any items

      // Iterate through each item in the shopping list
      for (const listItem of shoppingListItems) {
        const productInList = listItem.product;
        const requiredQuantity = listItem.quantity;

        // Find the specific store's price for this product
        const storePriceEntry = productInList.stores.find(s => s.name === storeName);

        if (storePriceEntry) {
          // Product is available in this store
          const itemPrice = parseFloat(storePriceEntry.price.replace("R", ""));
          totalCostForAvailableItems += itemPrice * requiredQuantity;
          itemsBreakdown.push({
            id: productInList.id,
            name: productInList.name,
            quantity: requiredQuantity,
            price: storePriceEntry.price,
            status: 'available',
          });
        } else {
          // Product is NOT available in this store ("Out of Stock")
          hasUnavailableItems = true;
          const cheapestAlternative = getCheapestAlternativeForProduct(productInList.id);
          itemsBreakdown.push({
            id: productInList.id,
            name: productInList.name,
            quantity: requiredQuantity,
            price: 'Out of Stock', // Explicitly set price as "Out of Stock"
            status: 'unavailable',
            alternative: cheapestAlternative // Recommendation for where to find it cheapest
          });
        }
      }

      comparisonResults.push({
        storeName: storeName,
        totalCostForAvailableItems: totalCostForAvailableItems, // This is the total for items *available* here
        hasUnavailableItems: hasUnavailableItems,
        itemsBreakdown: itemsBreakdown, // Detailed list of each item's status for this store
      });
    }

    // Sort results by totalCostForAvailableItems
    comparisonResults.sort((a, b) => {
      return a.totalCostForAvailableItems - b.totalCostForAvailableItems;
    });

    setTotalComparisonResults(comparisonResults);
    setIsTotalCompareModalOpen(true);
  };

  const handleCloseTotalCompareModal = () => {
    setIsTotalCompareModalOpen(false);
    setTotalComparisonResults([]);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearchChange={handleSearchChange} />
      <Hero onSearchChange={handleSearchChange} />
      <main className="flex-grow">
        <StoresSection />
        <ProductsSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onAddToList={handleAddToList}
        />
        <ShoppingList
          items={shoppingListItems}
          onRemoveItem={handleRemoveItem}
          onClearList={handleClearList}
          onUpdateQuantity={handleUpdateQuantity}
          onComparePrices={handleOpenCompareModal}
          onCompareAllPrices={handleCompareAllPrices}
        />
      </main>
      <Footer />

      {/* Single product comparison modal */}
      {isModalOpen && (
        <ComparePricesModal
          product={selectedProductForModal}
          onClose={handleCloseCompareModal}
        />
      )}

      {/* Total shopping list comparison modal */}
      {isTotalCompareModalOpen && (
        <TotalComparisonModal
          results={totalComparisonResults}
          onClose={handleCloseTotalCompareModal}
        />
      )}
    </div>
  );
}

export default App;