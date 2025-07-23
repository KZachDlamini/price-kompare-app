// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': {
          DEFAULT: '#2F3C7E', // Your logo's deep blue
          light: '#4A5C9B',
          dark: '#222A5D',
        },
        'brand-orange': {
          DEFAULT: '#F48B21',
          light: '#F7A74D',
          dark: '#C9741B',
        },
        'success-green': '#4CAF50',
        'warning-yellow': '#F2C94C',
        'error-red': '#EB5757',
      },
    },
  },
  plugins: [],
}