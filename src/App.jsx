import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Product from './pages/Product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Products />} />
        <Route path="produto/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
