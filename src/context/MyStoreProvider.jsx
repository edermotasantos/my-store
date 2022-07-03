/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyStoreContext from './MyStoreContext';

function MyStoreProvider({ children }) {
  const [page, setPage] = useState(1);
  const [productsPage, setProductsPage] = useState(<h3>...carregando</h3>);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(9);
  const [wineDetails, setWineDetails] = useState();
  const [priceFilter, setPriceFilter] = useState(false);
  const [numberOPages, setNumberOPages] = useState(7);
  const [search, setSearch] = useState({ newSearch: '' });
  const [nameFilter, setNameFilter] = useState(false);
  const [insideTheCart, setInsideTheCart] = useState({});
  const [cart, setCart] = useState([]);
  const [userName, setUserName] = useState('admin');
  const [count, setCount] = useState(0);
  const [totalItemsAddedToCart, setTotalItemsAddedToCart] = useState(0);

  const data = {
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
    search,
    setSearch,
    nameFilter,
    setNameFilter,
    insideTheCart,
    setInsideTheCart,
    cart,
    setCart,
    userName,
    setUserName,
    count,
    setCount,
    totalItemsAddedToCart,
    setTotalItemsAddedToCart,
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
