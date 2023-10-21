import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import CoinPage from './pages/CoinPage.js';

export default function App() {
  return (
    <BrowserRouter>
      <h2 style={{ textAlign: 'center', marginBlock: '30px' }}>Crypto Tracker</h2>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/coins/:uuid" element={<CoinPage />} exact />
      </Routes>
    </BrowserRouter>
  );
}