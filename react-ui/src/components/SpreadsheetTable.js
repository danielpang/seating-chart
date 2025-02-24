import React, { useState, useEffect } from 'react';
import { Download, Plus, ChevronUp, ChevronDown, Trash2, RefreshCw } from 'lucide-react';

// Helper function to convert data to CSV
const convertToCSV = (data) => {
  const filledRows = data.filter((row) =>
    row.name !== '' || row.table !== '' || row.email !== ''
  );

  if (filledRows.length === 0) return '';

  const headers = ['name', 'table', 'email'];
  return [
    headers.join(','),
    ...filledRows.map(row => 
      [row.name, row.table, row.email].map(cell => 
        cell.includes(',') ? `"${cell.replace(/"/g, '""')}"` : cell
      ).join(',')
    )
  ].join('\n');
};

const PasswordProtection = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const authenticate = async (input) => {
    try {
      const response = await fetch('https://deploy-preview-2--danielandanthea.netlify.app/.netlify/functions/auth', {
        method: 'POST',
        body: JSON.stringify({
          password: input
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });

      return response.status === 200;
    } catch (error) {
      console.error('Error authenticating:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await authenticate(password)) {
      onAuthenticate(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Table Data Access</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Access Table
          </button>
        </form>
      </div>
    </div>
  );
};

const SpreadsheetTable = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tableData, setTableData] = useState(
    Array(150).fill().map(() => ({
      name: '',
      table: '',
      email: ''
    }))
  );
  const [lastSaved, setLastSaved] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }

    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setTableData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const saveData = () => {
      localStorage.setItem('tableData', JSON.stringify(tableData));
      localStorage.setItem('tableDataCSV', convertToCSV(tableData));
      setLastSaved(new Date().toLocaleTimeString());
    };

    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [tableData]);

  const handleChange = (rowIndex, column, value) => {
    const newData = [...tableData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [column]: value
    };
    setTableData(newData);
  };

  const handlePaste = (e, rowIndex, column) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const rows = pasteData.split('\n');

    if (rows.length > 1 || pasteData.includes('\t')) {
      const newData = [...tableData];
      rows.forEach((row, i) => {
        if (rowIndex + i >= tableData.length) return;
        const cells = row.split('\t');
        cells.forEach((cell, j) => {
          const columns = ['name', 'table', 'email'];
          const columnIndex = j + columns.indexOf(column);
          if (columnIndex < columns.length) {
            newData[rowIndex + i] = {
              ...newData[rowIndex + i],
              [columns[columnIndex]]: cell.trim()
            };
          }
        });
      });
      setTableData(newData);
    } else {
      handleChange(rowIndex, column, pasteData);
    }
  };

  const insertRow = (index, position) => {
    const newData = [...tableData];
    const newRow = { name: '', table: '', email: '' };
    
    if (position === 'above') {
      newData.splice(index, 0, newRow);
    } else {
      newData.splice(index + 1, 0, newRow);
    }
    
    // Remove last row if we've exceeded our limit
    if (newData.length > 150) {
      newData.pop();
    }
    
    setTableData(newData);
  };

  const deleteRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    // Add empty row at the end to maintain 150 rows
    newData.push({ name: '', table: '', email: '' });
    setTableData(newData);
    if (selectedRow === index) {
      setSelectedRow(null);
    }
  };

  const clearTable = () => {
    if (window.confirm('Are you sure you want to clear all data from the table?')) {
      const emptyData = Array(150).fill().map(() => ({
        name: '',
        table: '',
        email: ''
      }));
      setTableData(emptyData);
      setSelectedRow(null);
    }
  };

  const exportToCSV = () => {
    const csvContent = localStorage.getItem('tableDataCSV');
    
    if (!csvContent) {
      alert('No data to export!');
      return;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'table_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticate={setIsAuthenticated} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Table Data</h2>
        <div className="flex items-center gap-4">
          {lastSaved && (
            <span className="text-sm text-gray-500">
              Last saved: {lastSaved}
            </span>
          )}
          <button
            onClick={exportToCSV}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Download size={20} />
            Download CSV
          </button>
          <button
            onClick={clearTable}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <RefreshCw size={20} />
            Clear Table
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto border border-gray-200 rounded">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b border-r px-4 py-2 text-left w-16">#</th>
              <th className="border-b border-r px-4 py-2 text-left">Name</th>
              <th className="border-b border-r px-4 py-2 text-left">Table</th>
              <th className="border-b px-4 py-2 text-left">Email</th>
              <th className="border-b px-4 py-2 text-left w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr 
                key={index} 
                className={`hover:bg-gray-50 ${selectedRow === index ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedRow(index)}
              >
                <td className="border-b border-r px-4 py-2 text-gray-500">{index + 1}</td>
                <td className="border-b border-r px-4 py-2">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    onPaste={(e) => handlePaste(e, index, 'name')}
                    className="w-full px-2 py-1 border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded"
                  />
                </td>
                <td className="border-b border-r px-4 py-2">
                  <input
                    type="text"
                    value={row.table}
                    onChange={(e) => handleChange(index, 'table', e.target.value)}
                    onPaste={(e) => handlePaste(e, index, 'table')}
                    className="w-full px-2 py-1 border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded"
                  />
                </td>
                <td className="border-b border-r px-4 py-2">
                  <input
                    type="email"
                    value={row.email}
                    onChange={(e) => handleChange(index, 'email', e.target.value)}
                    onPaste={(e) => handlePaste(e, index, 'email')}
                    className="w-full px-2 py-1 border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded"
                  />
                </td>
                <td className="border-b px-4 py-2">
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        insertRow(index, 'above');
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Insert row above"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        insertRow(index, 'below');
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Insert row below"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRow(index);
                      }}
                      className="p-1 hover:bg-red-100 text-red-600 rounded"
                      title="Delete row"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpreadsheetTable;