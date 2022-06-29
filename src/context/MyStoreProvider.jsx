import React, { useState } from 'react';
import MyStoreContext from './MyStoreContext';

function MyStoreProvider ({ children }) {
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

export default MyStoreProvider;
