/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyStoreContext from './MyStoreContext';

function MyStoreProvider({ children }) {
  const [productFav, setproductFav] = useState();
  const [page, setPage] = useState(1);
  const [productsPage, setProductsPage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const data = {
    productFav,
    setproductFav,
    page,
    setPage,
    productsPage,
    setProductsPage,
    isLoading,
    setIsLoading,
  };

  return (
    <MyStoreContext.Provider value={data}>
      { children }
    </MyStoreContext.Provider>
  );
}

MyStoreContext.propTypes = ({
  children: PropTypes.element.isRequired,
});

export default MyStoreProvider;
