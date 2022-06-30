import React, { useContext } from 'react';
import MyStoreContext from '../context/MyStoreContext';

function ProductList() {
  const { page } = useContext(MyStoreContext);
  const { productsPage, setProductsPage } = useContext(MyStoreContext);
  const { isLoading, setIsLoading } = useContext(MyStoreContext);

  const fetchWine = async () => {
    const url = `https://wine-back-test.herokuapp.com/products?page=${page}&limit=10`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('data', data.items);
    setIsLoading(false);
    setProductsPage(data.items);
    return data.items;
  };

  fetchWine();

  return (
    <>
      <p>produtos</p>
      { isLoading
        ? <h3>carregando</h3>
        : productsPage.map(({
          image, name, price, priceMember, priceNonMember, discount,
        }) => (
          <div>
            <div>
              <img alt={name} src={image} />
              <p>{name}</p>
              <div>
                <p>{`R$${price}`}</p>
                <p>{`${discount}% OFF`}</p>
              </div>
              <p>{`SÓCIO WINE R$${priceMember}`}</p>
              <p>{`NÃO SÓCIO R$${priceNonMember}`}</p>
            </div>
            <button type="button">adicionar</button>
          </div>
        ))}
    </>
  );
}

export default ProductList;
