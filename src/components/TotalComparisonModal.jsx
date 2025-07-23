// src/components/TotalComparisonModal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { jsPDF } from 'jspdf'; // Import jsPDF directly

function TotalComparisonModal({ results, onClose }) {
  const hasResults = results && results.length > 0;

  const handleSavePdf = () => {
    if (!results || results.length === 0) {
      alert("Your shopping list is empty, or no stores could be found for comparison. Cannot generate PDF.");
      return;
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let yPos = 20; // Starting Y position from top of the page
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - 2 * margin;

    // Sort results to ensure the cheapest is first, just like in your HTML rendering
    const sortedResults = [...results].sort((a, b) => a.totalCostForAvailableItems - b.totalCostForAvailableItems);
    const overallCheapestResult = sortedResults[0];

    // --- Title and Date ---
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(45, 55, 72); // Tailwind gray-800
    doc.text("Your Total Shopping List Comparison", pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(83, 83, 83); // Darker gray
    doc.text(`Comparison generated on: ${new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 20;
    doc.setDrawColor(72, 187, 120); // Green-500
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // --- Iterate through stores ---
    sortedResults.forEach((result, index) => {
      // Check for page break before each store block
      // If remaining space is less than approx height for a store block (e.g., 60-70mm per block + items)
      const minBlockHeight = 70 + (result.itemsBreakdown.length * 10); // Estimate for items + block
      if (yPos + minBlockHeight > pageHeight - margin) {
        doc.addPage();
        yPos = margin; // Reset Y position for new page

        // Optional: Re-add header on new page for continuity
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(45, 55, 72);
        doc.text("Shopping List Comparison (cont.)", pageWidth / 2, yPos, { align: 'center' });
        yPos += 15;
      }

      const isCheapest = result.storeName === overallCheapestResult.storeName;
      const storeNameColor = isCheapest ? [47, 133, 90] : [45, 55, 72]; // Green or Dark Gray
      const totalCostColor = isCheapest ? [47, 133, 90] : [45, 55, 72];

      // Store Name
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(storeNameColor[0], storeNameColor[1], storeNameColor[2]);
      doc.text(result.storeName, margin, yPos);
      if (isCheapest) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(255, 255, 255); // White text
        doc.setFillColor(72, 187, 120); // Green-500 background
        doc.roundedRect(margin + doc.getTextWidth(result.storeName) + 5, yPos - 3.5, doc.getTextWidth("Cheapest!") + 5, 6, 2, 2, 'F');
        doc.text("Cheapest!", margin + doc.getTextWidth(result.storeName) + 7.5, yPos + 1.2);
        doc.setTextColor(storeNameColor[0], storeNameColor[1], storeNameColor[2]); // Revert text color
      }
      yPos += 8;

      // Items Breakdown
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      result.itemsBreakdown.forEach(item => {
        // Check for page break before adding an item line
        if (yPos + 10 > pageHeight - margin) {
          doc.addPage();
          yPos = margin; // Reset Y position for new page
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(45, 55, 72);
          doc.text(`${result.storeName} (cont.)`, margin, yPos);
          yPos += 8;
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
        }

        doc.setTextColor(74, 85, 104); // Tailwind gray-700
        doc.text(`${item.name} (x${item.quantity})`, margin, yPos);

        if (item.status === 'available') {
          doc.setTextColor(45, 55, 72); // Tailwind gray-800
          doc.setFont("helvetica", "bold");
          doc.text(`R${(parseFloat(item.price.replace('R','')) * item.quantity).toFixed(2)}`, pageWidth - margin, yPos, { align: 'right' });
          doc.setFont("helvetica", "normal");
        } else {
          doc.setTextColor(229, 62, 62); // Tailwind red-600
          doc.setFont("helvetica", "bold");
          doc.text("Out of Stock", pageWidth - margin, yPos, { align: 'right' });
          doc.setFont("helvetica", "normal");
          if (item.alternative && item.alternative.name && item.alternative.price) {
            yPos += 4;
            doc.setFontSize(8);
            doc.setTextColor(49, 130, 206); // Tailwind blue-600
            doc.text(`(Find at ${item.alternative.name} for ${item.alternative.price})`, pageWidth - margin, yPos, { align: 'right' });
            doc.setFontSize(10); // Reset font size
          }
        }
        yPos += 7; // Line height for items
      });

      yPos += 5;
      doc.setDrawColor(226, 232, 240); // Gray-200
      doc.setLineWidth(0.2);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;

      // Total for Available Items
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(totalCostColor[0], totalCostColor[1], totalCostColor[2]);
      doc.text("Total for Available Items:", margin, yPos);
      doc.text(`R${result.totalCostForAvailableItems.toFixed(2)}`, pageWidth - margin, yPos, { align: 'right' });
      yPos += 8;

      if (result.hasUnavailableItems) {
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(183, 121, 31); // Tailwind yellow-700
        doc.text("* Note: Some items are out of stock at this store.", pageWidth - margin, yPos, { align: 'right' });
        doc.setFont("helvetica", "normal");
        yPos += 5;
      }
      yPos += 10; // Space after each store block
    });

    // --- Overall Recommendation ---
    yPos += 15; // Extra space before recommendation
    doc.setDrawColor(72, 187, 120); // Green-500
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(47, 133, 90); // Green-700
    doc.text("Overall Recommendation:", pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(39, 103, 73); // Darker Green
    doc.text(`Start at ${overallCheapestResult.storeName} for R${overallCheapestResult.totalCostForAvailableItems.toFixed(2)}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;

    if (overallCheapestResult.hasUnavailableItems) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(74, 85, 104); // Gray-700
      doc.text("(Remember to pick up out-of-stock items from alternative stores.)", pageWidth / 2, yPos, { align: 'center' });
    }

    // --- Save PDF ---
    doc.save(`Shopping_List_Comparison_${new Date().toLocaleDateString('en-ZA').replace(/\//g, '-')}.pdf`);
  };

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-[9998]" aria-hidden="true"></div>

      {/* Conditional rendering for either empty/no results OR results content */}
      {!hasResults ? (
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
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 overflow-y-auto">
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

            {/* Scrollable content area (This part is for display in the modal, not PDF generation) */}
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {results.map((result, index) => (
                <div
                  key={result.storeName}
                  className={`mb-6 p-4 rounded-lg border-2 ${
                    index === 0
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 bg-white'
                  }`}
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
            </div>

            {/* Overall Recommendation section */}
            <div className="mt-8 pt-4 border-t-2 border-green-500 text-center flex-shrink-0">
              <p className="text-xl font-bold text-green-800">
                Overall Recommendation:
              </p>
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