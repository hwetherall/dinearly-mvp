// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RestaurantList />} />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
    </Routes>
  );
}

export default App;
