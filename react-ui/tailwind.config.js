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
        "Brittany-Signature": ["Brittany-Signature", "sans-serif"],
        "Bona-Nova": ["Bona-Nova", "sans-serif"],
      },
    },
  },
  plugins: [],
};
