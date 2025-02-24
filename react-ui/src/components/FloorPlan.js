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
    // Row 1 (5 tables)
    { num: 1, x: 160, y: 120 },
    { num: 2, x: 360, y: 120 },
    { num: 3, x: 560, y: 120 },
    { num: 4, x: 760, y: 120 },
    { num: 5, x: 960, y: 120 },
    // Row 2 (4 tables, centered)
    { num: 6, x: 260, y: 320 },
    { num: 7, x: 460, y: 320 },
    { num: 8, x: 660, y: 320 },
    { num: 9, x: 860, y: 320 },
    { num: 10, x: 1060, y: 320 },
    // Row 3 (5 tables)
    { num: 11, x: 160, y: 520 },
    { num: 12, x: 360, y: 520 },
    { num: 13, x: 560, y: 520 },
    { num: 14, x: 760, y: 520 },
    { num: 15, x: 960, y: 520 },
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

          {/* Tables */}
          {tables.map((table) => (
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
          ))}
        </svg>
      </div>
    </div>
  );
};

export default FloorPlan;
