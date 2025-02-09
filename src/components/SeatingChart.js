import React, { useState, useEffect } from "react";
import { Search, Users, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Layout from "./Layout";
import consecutiveMatch from "./Search";
import * as Papa from "papaparse";
import FloorPlan from "./FloorPlan";
import GuestCard from "./GuestCard";

const csvFilePath = require("../lib/seating_4.csv");

const SeatingChart = () => {
  const [searchName, setSearchName] = useState("");
  const [guestList, setGuestList] = useState([]);
  const [foundGuests, setFoundGuests] = useState([]);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }

    fetch(csvFilePath)
      .then((response) => response.text())
      .then((responseText) => {
        // -- parse csv
        Papa.parse(responseText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              // Process the CSV data and add identifiers
              const processedData = results.data.map((row, index) => ({
                name: row.name,
                table: row.table,
                email: row.email,
                identifier: `guest_${index}_${row.name.toLowerCase().replace(/\s+/g, "_")}`,
              }));
              setGuestList(processedData);
            } else {
              // If CSV is empty, use fallback data
              console.log("No data found in CSV");
              setGuestList([]);
            }
            setIsLoading(false);
          },
          error: (error) => {
            console.error("CSV parsing error:", error);
            setGuestList([]);
            setIsLoading(false);
          },
        });
      });
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    setError("");
    setFoundGuests([]);
    setSelectedTable(null);

    if (!searchName.trim()) {
      setError("Please enter a name to search");
      setIsSearching(false);
      return;
    }

    setTimeout(() => {
      const matches = guestList.filter((guest) =>
        consecutiveMatch(searchName.trim(), guest.name),
      );

      if (matches.length > 0) {
        setFoundGuests(matches);
      } else {
        setError("No matching guests found");
      }
      setIsSearching(false);
    }, 500);
  };

  const handleCardSelect = (tableNumber) => {
    setSelectedTable(selectedTable === tableNumber ? null : tableNumber);
  };

  if (isLoading) {
    return (
      <Layout isDarkMode={isDarkMode}>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-lg text-gray-600 dark:text-gray-300">
            Loading guest list...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isDarkMode={isDarkMode}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 text-white relative">
            <div className="absolute top-4 right-4">
              <ThemeToggle
                isDark={isDarkMode}
                onToggle={() => setIsDarkMode(!isDarkMode)}
              />
            </div>
            <div className="flex items-center gap-1.5 mb-2">
              <Users size={28} />
              <h2 className="text-2xl font-playfair-display">Daniel & Anthea's Wedding</h2>
            </div>
            <p className="text-blue-100 font-playfair-display">
              Find your assigned table for the reception
            </p>
          </div>

          <div className="p-8">
            {/* Search Section */}
            <div className="relative">
              <div className="flex gap-3">
                <div className="relative flex-1 ">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={searchName}
                    maximum-scale={100}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all duration-200"
                  />
                  <Search
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>
              <div className="relative flex-1 py-3">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full text-center px-10 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors duration-200 items-center gap-2 disabled:opacity-50"
                >
                  {isSearching ? "Searching..." : "Find Seat"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Results Display */}
            {foundGuests.length > 0 && (
              <div className="mt-8 max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/50">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
                    Found {foundGuests.length} matching{" "}
                    {foundGuests.length === 1 ? "guest" : "guests"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {foundGuests.map((guest) => {
                      const hasDuplicates =
                        foundGuests.filter((g) => g.name === guest.name)
                          .length > 1;
                      return (
                        <GuestCard
                          key={guest.identifier}
                          guest={guest}
                          hasDuplicates={hasDuplicates}
                          isSelected={selectedTable === guest.table}
                          onSelect={handleCardSelect}
                        />
                      );
                    })}
                  </div>

                  <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
                    Please proceed to your assigned table when the event begins
                  </p>
                </div>

                {/* Floor Plan */}
                <div className="mt-8">
                  <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                  Floor Plan
                  </h3>
                  <FloorPlan
                    highlightedTables={foundGuests.map((guest) => guest.table)}
                    selectedTable={selectedTable}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SeatingChart;
