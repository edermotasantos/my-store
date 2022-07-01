/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyStoreContext from './MyStoreContext';

function MyStoreProvider({ children }) {
  const [productFav, setproductFav] = useState();
  const [page, setPage] = useState(1);
  const [productsPage, setProductsPage] = useState(<h3>...carregando</h3>);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(9);
  const [wineDetails, setWineDetails] = useState();
  const [priceFilter, setPriceFilter] = useState(false);
  const [numberOPages, setNumberOPages] = useState(7);

  const data = {
    productFav,
    setproductFav,
    page,
    setPage,
    productsPage,
    setProductsPage,
    isLoading,
    setIsLoading,
    limit,
    setLimit,
    wineDetails,
    setWineDetails,
    priceFilter,
    setPriceFilter,
    numberOPages,
    setNumberOPages,
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
