// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StoresSection from './components/StoresSection';
import ProductsSection from './components/ProductsSection';
import ShoppingList from './components/ShoppingList';
import Footer from './components/Footer';
import ComparePricesModal from './components/ComparePricesModal';
import TotalComparisonModal from './components/TotalComparisonModal';
import SearchPopup from './components/SearchPopup';
import NotificationPopup from './components/NotificationPopup'; // <--- NEW IMPORT

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
      { name: 'Spar', 'price': 'R27.80' }
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
  const [shoppingListItems, setShoppingListItems] = useState(() => {
    const savedList = localStorage.getItem('shoppingList');
    return savedList ? JSON.parse(savedList) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(DUMMY_PRODUCTS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  const [isTotalCompareModalOpen, setIsTotalCompareModalOpen] = useState(false);
  const [totalComparisonResults, setTotalComparisonResults] = useState([]);

  // State for search popup
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);

  // <--- NEW STATE FOR NOTIFICATION POPUP --->
  const [notification, setNotification] = useState(null); // { message: '...', id: uniqueId }

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingListItems));
  }, [shoppingListItems]);

  useEffect(() => {
    let tempProducts = [...DUMMY_PRODUCTS];

    if (selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(tempProducts);
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
    // <--- Trigger the notification here --->
    showNotification(`${product.name} added to your shopping list!`);
  };

  const handleRemoveItem = (productId) => {
    setShoppingListItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleClearList = () => {
    setShoppingListItems([]);
  };

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

  const handleOpenCompareModal = (product) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
    console.log('handleOpenCompareModal triggered for:', product.name);
  };
  const handleCloseCompareModal = () => {
    setIsModalOpen(false);
    setSelectedProductForModal(null);
  };

  const handleCompareAllPrices = () => {
    if (shoppingListItems.length === 0) {
      alert("Your shopping list is empty! Please add some items to compare.");
      setTotalComparisonResults([]);
      setIsTotalCompareModalOpen(true);
      return;
    }

    const allStoreNames = [...new Set(DUMMY_PRODUCTS.flatMap(p => p.stores.map(s => s.name)))];
    const comparisonResults = [];

    const getCheapestAlternativeForProduct = (productId) => {
      const product = DUMMY_PRODUCTS.find(p => p.id === productId);
      if (!product || !product.stores || product.stores.length === 0) {
        return null;
      }
      return product.stores.reduce((cheapest, currentStore) => {
        const currentPrice = parseFloat(currentStore.price.replace("R", ""));
        const cheapestPrice = cheapest ? parseFloat(cheapest.price.replace("R", "")) : Infinity;
        return currentPrice < cheapestPrice ? currentStore : cheapest;
      }, null);
    };

    const storeTotalsMap = new Map();
    allStoreNames.forEach(storeName => {
      storeTotalsMap.set(storeName, {
        storeName: storeName,
        totalCostForAvailableItems: 0,
        itemsBreakdown: [],
        hasUnavailableItems: false,
      });
    });

    for (const listItem of shoppingListItems) {
      const requiredProductId = listItem.product.id;
      const requiredQuantity = listItem.quantity;

      const fullProductData = DUMMY_PRODUCTS.find(p => p.id === requiredProductId);

      if (!fullProductData) {
        console.warn(`Product with ID ${requiredProductId} not found in DUMMY_PRODUCTS. Skipping.`);
        continue;
      }

      for (const storeName of allStoreNames) {
        const currentStoreResult = storeTotalsMap.get(storeName);

        const storePriceEntry = fullProductData.stores.find(s => s.name === storeName);

        if (storePriceEntry) {
          const itemPrice = parseFloat(storePriceEntry.price.replace("R", ""));
          if (!isNaN(itemPrice)) {
            currentStoreResult.totalCostForAvailableItems += itemPrice * requiredQuantity;
            currentStoreResult.itemsBreakdown.push({
              id: requiredProductId,
              name: fullProductData.name,
              quantity: requiredQuantity,
              price: storePriceEntry.price,
              status: 'available',
            });
          } else {
            console.warn(`Invalid price format for product ${fullProductData.name} at ${storeName}: ${storePriceEntry.price}`);
            currentStoreResult.hasUnavailableItems = true;
            currentStoreResult.itemsBreakdown.push({
              id: requiredProductId,
              name: fullProductData.name,
              quantity: requiredQuantity,
              status: 'unavailable',
              price: 'Invalid Price',
              alternative: null
            });
          }
        } else {
          currentStoreResult.hasUnavailableItems = true;
          const cheapestAlternative = getCheapestAlternativeForProduct(requiredProductId);
          currentStoreResult.itemsBreakdown.push({
            id: requiredProductId,
            name: fullProductData.name,
            quantity: requiredQuantity,
            price: 'Out of Stock',
            status: 'unavailable',
            alternative: cheapestAlternative ? {
              name: cheapestAlternative.name,
              price: `R${(parseFloat(cheapestAlternative.price.replace('R', '')) * requiredQuantity).toFixed(2)}`
            } : null,
          });
        }
      }
    }

    const finalComparisonResults = Array.from(storeTotalsMap.values());

    finalComparisonResults.sort((a, b) => {
      if (!a.hasUnavailableItems && b.hasUnavailableItems) return -1;
      if (a.hasUnavailableItems && !b.hasUnavailableItems) return 1;
      return a.totalCostForAvailableItems - b.totalCostForAvailableItems;
    });

    setTotalComparisonResults(finalComparisonResults);
    setIsTotalCompareModalOpen(true);
  };

  const handleCloseTotalCompareModal = () => {
    setIsTotalCompareModalOpen(false);
    setTotalComparisonResults([]);
  };

  // Functions for search popup
  const handleOpenSearchPopup = () => {
    setIsSearchPopupOpen(true);
  };

  const handleCloseSearchPopup = () => {
    setIsSearchPopupOpen(false);
  };

  // <--- NEW: Function to show notification --->
  const showNotification = (message) => {
    // Generate a unique ID to ensure re-render even if message is the same
    setNotification({ message, id: Date.now() });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onSearchChange={handleSearchChange}
        onOpenSearchPopup={handleOpenSearchPopup}
      />
      <Hero onSearchChange={handleSearchChange} />
      <main className="flex-grow">
        <StoresSection />
        <ProductsSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onAddToList={handleAddToList}
          onOpenCompareModal={handleOpenCompareModal}
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

      {/* Search Popup Component */}
      <SearchPopup
        isOpen={isSearchPopupOpen}
        onClose={handleCloseSearchPopup}
        products={DUMMY_PRODUCTS}
        onAddToList={handleAddToList}
      />

      {/* <--- NEW: Notification Popup Component ---> */}
      {notification && (
        <NotificationPopup
          key={notification.id} // Important for re-rendering on new message
          message={notification.message}
          onClose={handleCloseNotification}
        />
      )}
      {/* <--- END NEW: Notification Popup Component ---> */}
    </div>
  );
}

export default App;