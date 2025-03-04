/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
      },
      fontFamily: {
        "playfair-display": ["playfair display"],
      },
    },
  },
  plugins: [],
};
