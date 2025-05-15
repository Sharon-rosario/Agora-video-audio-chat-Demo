import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Listing from './pages/Listing';
import Consultation from './pages/Consultation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/consultation" element={<Consultation />} />
      </Routes>
    </Router>
  );
}

export default App;