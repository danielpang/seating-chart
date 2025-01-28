import React, { useState, useEffect } from 'react';
import { Search, Users } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const GUEST_DATA = {
  "John Smith": "1",
  "Jane Doe": "2",
  "Robert Johnson": "3",
  "Emily Davis": "1",
  "Michael Brown": "2"
};

const SeatingChart = () => {
  const [searchName, setSearchName] = useState('');
  const [guestList, setGuestList] = useState({});
  const [foundGuest, setFoundGuest] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    setGuestList(GUEST_DATA);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const fuzzyMatch = (input, target) => {
    input = input.toLowerCase();
    target = target.toLowerCase();
    let inputIdx = 0;
    let targetIdx = 0;
    
    while (inputIdx < input.length && targetIdx < target.length) {
      if (input[inputIdx] === target[targetIdx]) {
        inputIdx++;
      }
      targetIdx++;
    }
    
    return inputIdx === input.length;
  };

  const handleSearch = () => {
    setIsSearching(true);
    setError('');
    setFoundGuest(null);

    if (!searchName.trim()) {
      setError('Please enter a name to search');
      setIsSearching(false);
      return;
    }

    setTimeout(() => {
      const match = Object.entries(guestList).find(([name]) => 
        fuzzyMatch(searchName, name)
      );

      if (match) {
        setFoundGuest({
          name: match[0],
          table: match[1]
        });
      } else {
        setError('No matching guest found');
      }
      setIsSearching(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'} transition-colors duration-200`}>
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 text-white relative">
            <div className="absolute top-4 right-4">
              <ThemeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Users size={28} />
              <h2 className="text-2xl font-bold">Event Seating Chart</h2>
            </div>
            <p className="text-blue-100">Find your assigned table for the event</p>
          </div>

          <div className="p-8">
            {/* Search Section */}
            <div className="relative">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-hidden transition-all duration-200"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSearching ? 'Searching...' : 'Find Seat'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 fade-in">
                {error}
              </div>
            )}

            {/* Results Display */}
            {foundGuest && (
              <div className="mt-6 fade-in">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/50">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      Welcome, {foundGuest.name}!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">We've found your seating assignment</p>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-sm mx-auto">
                      <div className="text-6xl font-bold text-blue-500 mb-2">
                        {foundGuest.table}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Table Number
                      </div>
                    </div>
                    
                    <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                      Please proceed to your assigned table when the event begins
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatingChart;