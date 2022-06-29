import React from 'react';
import MyStoreProvider from '../context/MyStoreProvider';
import Header from '../components/Header';
import ProductList from '../components/ProductList';

function Products() {
  return (
    <MyStoreProvider>
      <Header />
      <ProductList />
    </MyStoreProvider>
  );
}

export default Products;
