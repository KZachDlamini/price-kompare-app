// src/components/StoresSection.jsx
import React from 'react';

// Import your store logos. Ensure these paths and filenames match your actual files in src/assets/stores/
// CORRECTED PATHS: Removed the extra 'src/'
import picknpayLogo from '../assets/stores/picknpay-logo.svg';
import checkersLogo from '../assets/stores/checkers-logo.svg'; // Corrected this one too
import woolworthsLogo from '../assets/stores/woolworths-logo2.svg';
import shopriteLogo from '../assets/stores/shoprite-logo.svg';


function StoresSection() {
  // Define the specific stores to display, including their imported logos
  const stores = [
    { name: 'Pick n Pay', logo: picknpayLogo, description: 'Fresh produce & groceries' },
    { name: 'Checkers', logo: checkersLogo, description: 'Wide range & value' },
    { name: 'Woolworths', logo: woolworthsLogo, description: 'Quality foods & lifestyle' },
    { name: 'Shoprite', logo: shopriteLogo, description: 'Low prices & essentials' },
  ];

  return (
    <section className="stores py-10 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">Popular Stores</h2>
        {/* Adjusted grid for 4 columns on medium screens and up, 2 on small */}
        <div className="store-grid grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stores.map((store) => (
            <button // Changed from div to button for better accessibility and interaction
              key={store.name} // Use store name as key for uniqueness
              className="store bg-gray-100 p-4 rounded-lg font-medium text-blue-900 shadow-sm
                         flex flex-col items-center justify-center // Added flex for vertical alignment
                         hover:bg-gray-200 transition duration-200 transform hover:-translate-y-1 // Added transform for hover effect
                         focus:outline-none focus:ring-2 focus:ring-brand-blue" // Added focus styles
              // You can add an onClick handler here if these buttons should do something when clicked
              // onClick={() => console.log(`Clicked on ${store.name}`)}
            >
              {/* Image element for the logo */}
              <img
                src={store.logo}
                alt={`${store.name} Logo`}
                className="h-16 mx-auto mb-3 object-contain" // Height: 16 units, auto horizontal margin, bottom margin, image fit
              />
              {/* Store Name */}
              <h3 className="text-lg font-semibold text-gray-800">{store.name}</h3>
              {/* Optional Description */}
              <p className="text-sm text-gray-600 mt-1">{store.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoresSection;