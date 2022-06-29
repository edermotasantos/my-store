import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from "./pages/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Products />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
