import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeatingChart from "./components/SeatingChart";
import SpreadsheetTable from "./components/SpreadsheetTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="min-h-screen bg-gray-100">
          <SeatingChart />
        </div>}/>
        <Route path="/edit" element={<div className="min-h-screen bg-gray-100">
          <SpreadsheetTable />
        </div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
