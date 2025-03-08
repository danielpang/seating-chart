import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Layout from "./Layout";
import consecutiveMatch from "./Search";
import * as Papa from "papaparse";
import FloorPlan from "./FloorPlan";
import GuestCard from "./GuestCard";
import { getSeatingData } from "./DataAccessLayer";

const csvFilePath = require("../lib/seating_5.csv");
const liveData = await getSeatingData();

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

    console.log(liveData);
    if (liveData) {
      const filteredData = setGuestDataFromStorage(liveData);
      if (filteredData.length > 0) {
        setGuestList(filteredData);
        setIsLoading(false);
      } else {
        useBackupData();
      }
    } else {
      useBackupData();
    }

    // Listen for changes
    const handleStorageChange = (e) => {
      if (e.key === 'tableData') {
        const filteredData = setGuestDataFromStorage(e.newValue);
        if (filteredData.length > 0) {
          setGuestList(filteredData);
        } else {
          useBackupData();
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setGuestDataFromStorage = (liveData) => {
    const filteredData = liveData.filter((guest) => guest.name && guest.table);
    return filteredData;
  }

  const useBackupData = () => {
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((responseText) => {
        // -- parse csv
        Papa.parse(responseText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              console.log("CSV data loaded:", results.data);
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
  }

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
      <div className="rounded-2xl max-w-4xl mx-auto my-auto">
        <div className="bg-white dark:bg-opacity-25 dark:bg-black/35 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200">
          {/* Header */}
          <div className="px-8 py-8 pb-2 text-black relative">
            <div className="absolute top-4 right-4">
              <ThemeToggle
                isDark={isDarkMode}
                onToggle={() => setIsDarkMode(!isDarkMode)}
              />
            </div>
            <div className="items-center mb-2">
              <h2 className="text-5xl font-Brittany-Signature leading-[1.5] text-center dark:text-white">Seating Chart</h2>
            </div>
          </div>

          <div className="px-8 py-4">
            {/* Search Section */}
            <div className="relative">
              <div className="flex gap-2">
                <div className="relative flex-1 ">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={searchName}
                    maximum-scale={100}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full px-4 py-2 rounded-md bg-white dark:border-white dark:bg-transparent dark:text-white dark:placeholder-white text-black placeholder-gray-450 border border-gray-500 focus:outline-none dark:focus:ring-gray-900 focus:ring-1 focus:ring-white"
                    />
                  <Search
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white"
                    size={20}
                  />
                </div>
              </div>
              <div className="relative flex-1 py-3">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full text-center px-10 py-3 bg-black hover:bg-grey-600 text-white rounded-md font-medium transition-colors duration-200 items-center gap-2 disabled:opacity-50"
                >
                  {isSearching ? "Searching..." : "Find Seat"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Results Display */}
            {foundGuests.length > 0 && (
              <div className="mt-8 max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/50">
                  <h3 className="text-xl font-semibold text-black dark:black mb-4 text-center">
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

                  <p className="mt-6 text-sm text-gray-500 text-black text-center">
                    Please proceed to your assigned table when the event begins
                  </p>
                </div>

                {/* Floor Plan */}
                <div className="mt-8">
                  <h3 className="text-xl font-medium text-black dark:black mb-4 text-center">
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
