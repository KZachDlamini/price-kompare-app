// src/components/NotificationPopup.jsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function NotificationPopup({ message, duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the popup
    setIsVisible(true);

    // Set a timeout to hide the popup and then close it
    const timer = setTimeout(() => {
      setIsVisible(false);
      // After fade-out, call onClose to unmount the component
      const unmountTimer = setTimeout(() => {
        onClose();
      }, 500); // Allow time for the fade-out transition (0.5s)
      return () => clearTimeout(unmountTimer);
    }, duration);

    // Cleanup function for when the component unmounts or duration changes
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!ReactDOM.createPortal) {
    console.error("ReactDOM.createPortal is not available. Ensure you are using React 16+.");
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[10000] transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
    >
      <p className="font-regular text-sm">{message}</p>
    </div>,
    document.getElementById('modal-root')
  );
}

export default NotificationPopup;