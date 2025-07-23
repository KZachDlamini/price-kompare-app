// src/components/TotalComparisonModal.jsx
import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM for createPortal
import html2pdf from 'html2pdf.js'; // Import the library

function TotalComparisonModal({ results, onClose }) {
  // This flag determines which modal content to render
  const hasResults = results && results.length > 0;

  // Function to handle saving the modal content as PDF
  const handleSavePdf = () => {
    // Get the element that contains the content you want to save (the modal's inner div)
    const element = document.getElementById('total-comparison-modal-content');

    if (element) {
      // Options for the PDF generation
      const opt = {
        margin: 0.5,
        filename: 'Shopping_List_Comparison.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: {
          mode: ['css', 'avoid-all'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: '.no-page-break'
        }
      };

      // Generate the PDF
      html2pdf().set(opt).from(element).save();
    } else {
      alert("Could not find content to save as PDF.");
    }
  };

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-[9998]" aria-hidden="true"></div>

      {/* Conditional rendering for either empty/no results OR results content */}
      {!hasResults ? ( // RENDER THIS IF NO RESULTS
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fade-in-up">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Shopping List Comparison
            </h3>
            <p className="text-gray-600">
              Your shopping list is empty, or no stores could be found for comparison.
            </p>
          </div>
        </div>
      ) : ( // RENDER THIS IF THERE ARE RESULTS
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 overflow-y-auto"> {/* Added overflow-y-auto here too for very small screens */}
          <div
            id="total-comparison-modal-content"
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl relative animate-fade-in-up flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold z-10"
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 flex-shrink-0">
              Your Shopping List Totals by Store
            </h3>

            {/* Scrollable content area */}
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {results.map((result, index) => (
                <div
                  key={result.storeName}
                  className={`mb-6 p-4 rounded-lg border-2 ${
                    index === 0
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 bg-white'
                  } no-page-break`}
                >
                  <h4 className={`text-xl font-semibold mb-3 ${index === 0 ? 'text-green-700' : 'text-gray-800'}`}>
                    {result.storeName}
                    {index === 0 && <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">Cheapest for available items!</span>}
                  </h4>

                  <ul className="space-y-2 mb-3">
                    {result.itemsBreakdown.map(item => (
                      <li key={item.id} className="flex justify-between items-center text-gray-700">
                        <span>
                          {item.name} (x{item.quantity})
                        </span>
                        {item.status === 'available' ? (
                          <span className="font-semibold text-right">R{(parseFloat(item.price.replace('R','')) * item.quantity).toFixed(2)}</span>
                        ) : (
                          <div className="text-right">
                            <span className="font-semibold text-red-600">Out of Stock</span>
                            {item.alternative && (
                              // Ensure alternative.price is correctly formatted and available
                              <p className="text-xs text-blue-600 mt-1">
                                (Find at {item.alternative.name} for {item.alternative.price})
                              </p>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="text-lg font-bold text-right mt-4 pt-3 border-t border-gray-200">
                    Total for Available Items: <span className={index === 0 ? 'text-green-700' : 'text-gray-800'}>R{result.totalCostForAvailableItems.toFixed(2)}</span>
                  </div>
                  {result.hasUnavailableItems && (
                    <p className="text-sm text-yellow-700 text-right italic mt-2">
                      * Note: Some items are out of stock at this store.
                    </p>
                  )}
                </div>
              ))}
            </div> {/* End of scrollable content area */}

            {/* Overall Recommendation section */}
            <div className="mt-8 pt-4 border-t-2 border-green-500 text-center no-page-break flex-shrink-0">
              <p className="text-xl font-bold text-green-800">
                Overall Recommendation:
              </p>
              {/* Directly use results[0] here as hasResults ensures it exists */}
              <p className="text-2xl font-extrabold text-green-900 mt-2">
                Start at {results[0].storeName} for R{results[0].totalCostForAvailableItems.toFixed(2)}
              </p>
              {results[0].hasUnavailableItems && (
                <p className="text-sm text-gray-600 mt-2">
                  (Remember to pick up out-of-stock items from alternative stores.)
                </p>
              )}
              {/* Save as PDF button */}
              <button
                onClick={handleSavePdf}
                className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-200 text-lg font-semibold shadow-md"
              >
                Save as PDF 📥
              </button>
            </div>
          </div>
        </div>
      )}
    </>
    , document.getElementById('modal-root')
  );
}

export default TotalComparisonModal;