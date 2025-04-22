import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const EmptyTableMembersCarousel = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl w-full shadow-md p-6 pb-10 mx-auto">
          <div className="mb-2 text-center">
            <h3 className="text-xl text-gray-800 dark:text-gray-200">
              Table #
            </h3>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 font-sans text-center">
            Select a name above to see the Table Details.
          </div>
        </div>
      )
};

export const TableMembersCarousel = ({ tables, currentTableNumber, onNavigate }) => {
  // Get current table's members
  const currentTable = tables[currentTableNumber] || { name: `Table ${currentTableNumber}`, members: [] };
  
  const handlePrevious = () => {
    // Find the previous table number
    const tableNumbers = Object.keys(tables).map(Number).sort((a, b) => a - b);
    const currentIndex = tableNumbers.indexOf(Number(currentTableNumber));
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tableNumbers.length - 1;
    onNavigate(tableNumbers[prevIndex].toString());
  };
  
  const handleNext = () => {
    // Find the next table number
    const tableNumbers = Object.keys(tables).map(Number).sort((a, b) => a - b);
    const currentIndex = tableNumbers.indexOf(Number(currentTableNumber));
    const nextIndex = currentIndex < tableNumbers.length - 1 ? currentIndex + 1 : 0;
    onNavigate(tableNumbers[nextIndex].toString());
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl w-full shadow-md p-6 pb-10 mx-auto">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={handlePrevious}
          className="text-gray-400 hover:text-rose-500 dark:text-gray-500 dark:hover:text-rose-400 p-1"
          aria-label="Previous table"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h3 className="text-xl text-gray-800 dark:text-gray-200 text-center">
          Table {currentTableNumber}
          <div className="text-sm text-gray-500 dark:text-gray-400 font-sans">
            {currentTable.groupName || ""}
          </div>
        </h3>
        
        <button 
          onClick={handleNext}
          className="text-gray-400 hover:text-rose-500 dark:text-gray-500 dark:hover:text-rose-400 p-1"
          aria-label="Next table"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="mt-4">
        <ul className="grid grid-cols-1 gap-2 m-auto place-items-center">
          {currentTable.members && currentTable.members.map((member, index) => (
            <li key={index} className="flex items-center">
              <span className="text-gray-800 dark:text-gray-200">{member}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const organizeGuestsByTable = (guests) => {
  const tables = {};
  
  guests.forEach(guest => {
    const tableNumber = guest.table;
    if (!tables[tableNumber]) {
      tables[tableNumber] = {
        members: []
      };
    }
    
    // Extract the guest name
    tables[tableNumber].members.push(guest.name);
  });

  // Add sample group names for some tables
  tables['1'].groupName = "Daniel's Family";
  tables['2'].groupName = "Anthea's Family";
  tables['3'].groupName = "Anthea's Family Friends";
  tables['4'].groupName = "Anthea's Family Friends";
  tables['5'].groupName = "Daniel's Residence Friends and Former Coworkers";
  tables['6'].groupName = "Anthea's RHCA Friends & Old DG";
  tables['7'].groupName = "Anthea's RHCA Friends";
  tables['8'].groupName = "Anthea's Coworkers";
  tables['9'].groupName = "CCF Friends";
  tables['10'].groupName = "CCF Friends";
  tables['11'].groupName = "RHCCC Friends";
  tables['12'].groupName = "RHCCC Friends";
  tables['13'].groupName = "RHCCC Friends and Pastors";
  tables['14'].groupName = "Bridesmaids";
  tables['15'].groupName = "Groomsmen";
  tables['16'].groupName = "Bride and Groom";
  
  return tables;
};
