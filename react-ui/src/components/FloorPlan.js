import React from "react";

const FloorPlan = ({ highlightedTables, selectedTable }) => {
  const tableSet = new Set(highlightedTables.map(String));

  const getTableColor = (tableNum) => {
    if (String(tableNum) === String(selectedTable)) {
      return "fill-green-500 dark:fill-green-400";
    }
    if (tableSet.size > 0) {
      return tableSet.has(String(tableNum))
        ? "fill-blue-500 dark:fill-blue-400"
        : "fill-gray-200 dark:fill-gray-700";
    }
    return "fill-gray-200 dark:fill-gray-700";
  };

  // Table configuration with larger spacing
  const tables = [
    // Top Tables
    { num: 1, x: 400, y: 120 },
    { num: 2, x: 560, y: 120 },
    { num: 3, x: 720, y: 120 },
    { num: 4, x: 880, y: 120 },
    // Rectangular tables
    { num: 5, x: 800, y: 250, table_type: "rectangular" },
    { num: 6, x: 800, y: 340, table_type: "rectangular" },
    // Middle Tables (5 tables)
    { num: 7, x: 400, y: 320 },
    { num: 8, x: 520, y: 250 },
    { num: 9, x: 520, y: 390 },
    { num: 10, x: 680, y: 250 },
    { num: 11, x: 680, y: 390 },
    // Bottom Tables (4 tables)
    { num: 12, x: 400, y: 520 },
    { num: 13, x: 560, y: 520 },
    { num: 14, x: 720, y: 520 },
    { num: 15, x: 880, y: 520 },
    // Head Table
    { num: 16, x: 950, y: 280, table_type: "head_table" },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
      <div className="aspect-1 relative">
        <svg viewBox="0 0 1120 640" className="w-full h-full">
          {/* Background */}
          <rect
            x="0"
            y="0"
            width="1120"
            height="640"
            className="fill-gray-50 dark:fill-gray-900"
          />

          {/* Entrance */}
          <rect
            x="0"
            y="580"
            width="100"
            height="40"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <text
            x="50"
            y="605"
            className="text-lg fill-gray-600 dark:fill-gray-300 text-center"
            textAnchor="middle"
          >
            Entrance
          </text>

          {/* Bar */}
          <rect
            x="0"
            y="290"
            width="100"
            height="40"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <text
            x="50"
            y="315"
            className="text-lg fill-gray-600 dark:fill-gray-300 text-center"
            textAnchor="middle"
          >
            Bar
          </text>

          {/* Stone Wall */}
          <rect
            x="500"
            y="580"
            width="100"
            height="40"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <text
            x="550"
            y="605"
            className="text-lg fill-gray-600 dark:fill-gray-300 text-center"
            textAnchor="middle"
          >
            Stone Wall
          </text>

          {/* Patio Doors */}
          <rect
            x="500"
            y="0"
            width="100"
            height="40"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <text
            x="550"
            y="25"
            className="text-lg fill-gray-600 dark:fill-gray-300 text-center"
            textAnchor="middle"
          >
            Patio Doors
          </text>

          {/* Window */}
          <rect
            x="1040"
            y="300"
            width="80"
            height="40"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <text
            x="1080"
            y="325"
            className="text-lg fill-gray-600 dark:fill-gray-300 text-center"
            textAnchor="middle"
          >
            Window
          </text>

          {/* Dance Floor */}
          <rect
            x="120"
            y="120"
            width="180"
            height="400"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <text
            x="210"
            y="320"
            className="text-lg fill-gray-600 dark:fill-gray-300 text-center"
            textAnchor="middle"
          >
            🪩💃🏻🕺🏻🪩
          </text>

          {/* Tables */}
          {tables.map((table) => {
            console.log(table);
            if (table.table_type && table.table_type === "head_table") {
              return (
                <g key={table.num}>
                  <rect
                    key={table.num}
                    x={table.x}
                    y={table.y}
                    width="40"
                    height="80"
                    className={`transition-colors duration-300 ${getTableColor(table.num)}`}
                  />
                  <text
                    x={table.x + 20}
                    y={table.y + 40}
                    className="text-2xl fill-gray-700 dark:fill-gray-200 font-bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {table.num}
                  </text>
                </g>
              );
            } else if (table.table_type && table.table_type === "rectangular") {
              return (
                <g key={table.num}>
                  <rect
                    key={table.num}
                    x={table.x}
                    y={table.y}
                    width="120"
                    height="50"
                    className={`transition-colors duration-300 ${getTableColor(table.num)}`}
                  />
                  <text
                    x={table.x + 60}
                    y={table.y + 25}
                    className="text-2xl fill-gray-700 dark:fill-gray-200 font-bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {table.num}
                  </text>
                </g>
              );
            } else {
              return (
              <g key={table.num}>
                <circle
                  cx={table.x}
                  cy={table.y}
                  r="50"
                  className={`transition-colors duration-300 ${getTableColor(table.num)}`}
                />
                <text
                  x={table.x}
                  y={table.y}
                  className="text-2xl fill-gray-700 dark:fill-gray-200 font-bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {table.num}
                </text>
              </g>
              );
            }
          }
          )}
        </svg>
      </div>
    </div>
  );
};

export default FloorPlan;
