import React, { useContext } from 'react';
import MyStoreContext from '../context/MyStoreContext';
import Loading from './Loading';

function ProductList() {
  const { page, setPage } = useContext(MyStoreContext);
  const { productsPage, setProductsPage } = useContext(MyStoreContext);
  const { isLoading, setIsLoading } = useContext(MyStoreContext);
  const { limit } = useContext(MyStoreContext);

  const fetchWine = async () => {
    const url = `https://wine-back-test.herokuapp.com/products?page=${page}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    setIsLoading(false);
    setProductsPage(data.items);
    return data.items;
  };

  if (isLoading === true) fetchWine();

  const changePage = ({ target: { value } }) => {
    const newValue = parseInt(value, 10);
    setPage(newValue);
    setIsLoading(true);
  };

  return (
    <>
      <p>produtos</p>
      { isLoading
        ? <Loading />
        : productsPage.map(({
          image, name, price, priceMember, priceNonMember, discount, id,
        }) => (
          <div key={id}>
            <div>
              <img alt={name} src={image} />
              <p>{name}</p>
              <div>
                <p>{`R$${price}`.replace('.', ',')}</p>
                <p>{`${discount}% OFF`}</p>
              </div>
              <p>{`SÓCIO WINE R$${priceMember}`.replace('.', ',')}</p>
              <p>{`NÃO SÓCIO R$${priceNonMember}`.replace('.', ',')}</p>
            </div>
            <button type="button">adicionar</button>
          </div>
        ))}
      <div>
        { page > 1 ? <button type="button" onClick={() => setPage((prevState) => prevState - 1)}>Anterior</button>
          : <p> </p> }
        <button type="button" value={page} onClick={(e) => changePage(e)}>{page}</button>
        <button type="button" value={page + 1} onClick={(e) => changePage(e)}>{page + 1}</button>
        <button type="button" value={page + 2} onClick={(e) => changePage(e)}>{page + 2}</button>
        <p>...</p>
        <button type="button" onClick={() => setPage((prevState) => prevState + 1)}>Próximo &gt;&gt;</button>
      </div>
    </>
  );
}

export default ProductList;
