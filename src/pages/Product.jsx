import React from 'react';
import MyStoreProvider from '../context/MyStoreProvider';
import Header from '../components/Header';
import ProductDetails from '../components/ProductDetails';

function Products() {
  return (
    <MyStoreProvider>
      <Header />
      <ProductDetails />
    </MyStoreProvider>
  );
}

export default Products;
