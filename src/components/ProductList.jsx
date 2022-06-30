import React, { useContext, useEffect } from 'react';
import MyStoreContext from '../context/MyStoreContext';
import Loading from './Loading';
import fetchWine from '../services/requestWineAPI';

function ProductList() {
  const { page, setPage } = useContext(MyStoreContext);
  const { productsPage, setProductsPage } = useContext(MyStoreContext);
  const { isLoading, setIsLoading } = useContext(MyStoreContext);
  const { limit, setLimit } = useContext(MyStoreContext);

  const getWine = async (pageNumber, limitNumber) => {
    const response = await fetchWine(pageNumber, limitNumber);
    setIsLoading(false);
    setProductsPage(response);
  };

  if (isLoading === true) {
    useEffect(() => {
      const currentHeight = window.screen.height;
      const currentWidth = window.screen.width;

      if (limit > 8 && (currentHeight < 900 || currentWidth < 1440)) {
        setLimit(8);
        setIsLoading(true);
      }
      getWine(page, limit);
    }, []);
  }

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
        { page > 1 ? <button type="button" onClick={() => setPage((prevState) => prevState - 1)}>&lt;&lt; Anterior</button>
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
