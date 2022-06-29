/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyStoreContext from './MyStoreContext';

function MyStoreProvider({ children }) {
  const [productFav, setproductFav] = useState();

  const data = {
    productFav,
    setproductFav,
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
