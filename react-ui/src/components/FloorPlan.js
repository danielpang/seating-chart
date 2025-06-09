import React from "react";

const FloorPlan = ({ highlightedTables, selectedTable }) => {
  const tableSet = new Set(highlightedTables.map(String));
  const CLIENT = process.env.REACT_APP_CLIENT;

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
  const daniel_tables = [
    // Left Tables
    { num: 1, x: 350, y: 140 },
    { num: 2, x: 360, y: 260 },
    { num: 3, x: 230, y: 170 },
    { num: 4, x: 240, y: 290 },
    { num: 5, x: 160, y: 410 },
    { num: 6, x: 270, y: 440 },
    // Middle Tables (5 tables)
    { num: 7, x: 370, y: 380 },
    { num: 8, x: 470, y: 440 },
    { num: 9, x: 600, y: 440 },
    { num: 10, x: 720, y: 440 },
    { num: 11, x: 840, y: 420 },
    // Right Tables (4 tables)
    { num: 12, x: 750, y: 330 },
    { num: 13, x: 860, y: 280 },
    { num: 14, x: 750, y: 200 },
    { num: 15, x: 860, y: 160 },
    // Head Table
    { num: 16, x: 510, y: 60, table_type: "head_table" },
  ];

  const dao_tables = [
    // Left Tables
    { num: 1, x: 350, y: 140, table_type: "rectangular" },
    { num: 2, x: 350, y: 260, table_type: "rectangular" },
    { num: 3, x: 350, y: 400, table_type: "rectangular" },
    { num: 4, x: 440, y: 140, table_type: "rectangular" },
    { num: 5, x: 440, y: 260, table_type: "rectangular" },
    { num: 6, x: 440, y: 400, table_type: "rectangular" },
    { num: 7, x: 530, y: 140, table_type: "rectangular" },
    { num: 8, x: 530, y: 260, table_type: "rectangular" },
    { num: 9, x: 620, y: 140, table_type: "rectangular" },
    { num: 10, x: 620, y: 260, table_type: "rectangular" },
    { num: 11, x: 620, y: 400, table_type: "rectangular" },
    { num: 12, x: 710, y: 140, table_type: "rectangular" },
    { num: 13, x: 710, y: 260, table_type: "rectangular" },
    { num: 14, x: 710, y: 400, table_type: "rectangular" },

    // Head Table
    { num: 15, x: 510, y: 60, table_type: "head_table" },
  ];

  let tables = [];
  if (CLIENT === "dao") {
    tables = dao_tables;
  } else {
    tables = daniel_tables;
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
      <div className="aspect-1 relative">
        <svg viewBox="0 0 1120 800" className="w-full h-full">
          {/* Background */}
          <rect
            x="0"
            y="0"
            width="1120"
            height="800"
            className="fill-gray-50 dark:fill-gray-900"
          />

          {/* Windows */}
          {/* <rect
            x="260"
            y="550"
            width="50"
            height="140"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <text
            x="290"
            y="620"
            className="text-lg fill-gray-600 dark:fill-gray-300 text-center [writing-mode:sideways-lr]"
            textAnchor="middle"
          >
            Welcome Table
          </text> */}

          {/* Patio Doors */}
          <rect
            x="500"
            y="700"
            width="100"
            height="40"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <text
            x="550"
            y="725"
            className="text-lg fill-gray-600 dark:fill-gray-300 text-center"
            textAnchor="middle"
          >
            DJ Booth
          </text>

          {/* Stone Wall */}
          {/* <rect
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
            Stone Wall
          </text> */}

          {/* Bar */}
          <rect
            x="680"
            y="655"
            width="80"
            height="40"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <text
            x="720"
            y="680"
            className="text-lg fill-gray-600 dark:fill-gray-300 text-center"
            textAnchor="middle"
          >
            Bar
          </text>

          {/* Dance Floor */}
          {/* <rect
            x="425"
            y="120"
            width="250"
            height="250"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <text
            x="550"
            y="200"
            className="text-lg fill-gray-600 dark:fill-gray-300 text-center"
            textAnchor="middle"
          >
            🪩💃🏻🕺🏻🪩
          </text> */}

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
                    width="80"
                    height="40"
                    className={`transition-colors duration-300 ${getTableColor(table.num)}`}
                  />
                  <text
                    x={table.x + 40}
                    y={table.y + 20}
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
                    width="50"
                    height="120"
                    className={`transition-colors duration-300 ${getTableColor(table.num)}`}
                  />
                  <text
                    x={table.x + 25}
                    y={table.y + 60}
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
