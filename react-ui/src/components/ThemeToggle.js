import React from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gray-100" />
      ) : (
        <Moon className="w-5 h-5 text-gray-100" />
      )}
    </button>
  );
};

export default ThemeToggle;
