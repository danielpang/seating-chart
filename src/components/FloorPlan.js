import React, { useState, useEffect } from 'react';
import { Search, Users, Moon, Sun, Mail } from 'lucide-react';
import Papa from 'papaparse';

// Previous components (ThemeToggle, Layout) remain the same...

const FloorPlan = ({ highlightedTables, selectedTable }) => {
const tableSet = new Set(highlightedTables.map(String));

const getTableColor = (tableNum) => {
    if (String(tableNum) === String(selectedTable)) {
    return 'fill-green-500 dark:fill-green-400';
    }
    if (tableSet.size > 0) {
    return tableSet.has(String(tableNum)) 
        ? 'fill-blue-500 dark:fill-blue-400' 
        : 'fill-gray-200 dark:fill-gray-700';
    }
    return 'fill-gray-200 dark:fill-gray-700';
};

// Table configuration - now with 14 tables
const tables = [
    // Row 1 (5 tables)
    { num: 1, x: 120, y: 100 },
    { num: 2, x: 270, y: 100 },
    { num: 3, x: 400, y: 100 },
    { num: 4, x: 530, y: 100 },
    { num: 5, x: 680, y: 100 },
    // Row 2 (4 tables)
    { num: 6, x: 150, y: 225 },
    { num: 7, x: 300, y: 225 },
    { num: 8, x: 500, y: 225 },
    { num: 9, x: 650, y: 225 },
    // Row 3 (5 tables)
    { num: 10, x: 120, y: 350 },
    { num: 11, x: 270, y: 350 },
    { num: 12, x: 400, y: 350 },
    { num: 13, x: 530, y: 350 },
    { num: 14, x: 680, y: 350 }
];

return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-inner">
    <div className="aspect-[16/9] relative">
        <svg 
        viewBox="0 0 800 500" 
        className="w-full h-full"
        >
        {/* Background */}
        <rect x="0" y="0" width="800" height="500" className="fill-gray-50 dark:fill-gray-900" />
        
        {/* Entrance */}
        <rect x="370" y="450" width="60" height="30" className="fill-gray-300 dark:fill-gray-600" />
        <text x="400" y="470" className="text-sm fill-gray-600 dark:fill-gray-300 text-center" textAnchor="middle">Entrance</text>

        {/* Center aisle indicators */}
        <line x1="400" y1="420" x2="400" y2="380" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="2" strokeDasharray="4" />

        {/* Tables */}
        {tables.map(table => (
            <g key={table.num}>
            <circle 
                cx={table.x} 
                cy={table.y} 
                r="32" 
                className={`transition-colors duration-300 ${getTableColor(table.num)}`} 
            />
            <text 
                x={table.x} 
                y={table.y} 
                className="text-xl fill-gray-700 dark:fill-gray-200 font-bold" 
                textAnchor="middle" 
                dominantBaseline="middle"
            >
                {table.num}
            </text>
            </g>
        ))}

        {/* Legend */}
        <text x="50" y="480" className="text-sm fill-gray-500 dark:fill-gray-400">Round tables seat 8 people each</text>
        </svg>
    </div>
    </div>
);
};

export default FloorPlan;