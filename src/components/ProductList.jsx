import React, { useContext, useEffect } from 'react';
import MyStoreContext from '../context/MyStoreContext';
import Loading from './Loading';
import RequestWineAPI from '../services/requestWineAPI';

function ProductList() {
  const { page, setPage } = useContext(MyStoreContext);
  const { productsPage, setProductsPage } = useContext(MyStoreContext);
  const { isLoading, setIsLoading } = useContext(MyStoreContext);
  const { limit, setLimit } = useContext(MyStoreContext);
  const { priceFilter, setPriceFilter } = useContext(MyStoreContext);
  const { numberOPages, setNumberOPages } = useContext(MyStoreContext);

  const currentNumberOfPages = async () => {
    const data = await RequestWineAPI.fetchWineDetails();
    if (data !== numberOPages) {
      const newNumberOfPages = Math.ceil((data.length) / limit);
      setNumberOPages(newNumberOfPages);
    }
  };

  const getWine = async (pageNumber, limitNumber) => {
    const response = await RequestWineAPI.fetchWine(pageNumber, limitNumber);
    await currentNumberOfPages();
    setIsLoading(false);
    setProductsPage(response);
  };

  const filteredPageByPrice = async (dataFilteredByPrice) => {
    await currentNumberOfPages();
    setPage(1);
    let start = 0;
    let end = limit;
    if (page > 1) {
      start = limit + 1;
      end = start + limit;
    }
    const wineFilteredByPrice = dataFilteredByPrice.slice(start, end);
    setIsLoading(false);
    setProductsPage(wineFilteredByPrice);
  };

  const getWineByFilter = async ({ target: { value } }) => {
    const price = JSON.parse(value);
    const response = await RequestWineAPI.fetchWineDetails();
    let dataFilteredByPrice = '';

    if (price === 100) {
      dataFilteredByPrice = response.filter((item) => item.priceMember <= price);
    }
    if (typeof price === 'object') {
      dataFilteredByPrice = response.filter((item) => (
        price[0] <= item.priceMember && item.priceMember <= price[1]
      ));
    }
    if (price === 200) {
      dataFilteredByPrice = response.filter((item) => item.priceMember >= price);
    }
    setPriceFilter(dataFilteredByPrice);
    await filteredPageByPrice(dataFilteredByPrice);
  };

  if (isLoading === true) {
    useEffect(() => {
      const currentHeight = window.screen.height;
      const currentWidth = window.screen.width;

      if (limit > 8 && (currentHeight < 900 || currentWidth < 1440)) {
        setLimit(8);
        setIsLoading(true);
      }
      if (!priceFilter) getWine(page, limit);
      if (priceFilter) filteredPageByPrice(priceFilter);
    }, []);
  }

  const changePage = ({ target: { value } }) => {
    const newValue = parseInt(value, 10);
    setPage(newValue);
    setIsLoading(true);
  };

  return (
    <>
      <fieldset onChange={(e) => {
        // setIsLoading(true);
        getWineByFilter(e);
      }}
      >
        <legend>Refine sua busca</legend>
        <legend>Por preço</legend>
        <div>
          <label htmlFor="first-radio">
            Até R$100
            <input type="radio" id="first-radio" name="filter-by-price" value="100" />
          </label>
        </div>
        <div>
          <label htmlFor="second-radio">
            R$100 A R$200
            <input type="radio" id="second-radio" name="filter-by-price" value="[100, 200]" />
          </label>
        </div>
        <div>
          <label htmlFor="third-radio">
            Acima de R$175
            <input type="radio" id="fifth-radio" name="filter-by-price" value="200" />
          </label>
        </div>
      </fieldset>
      <p>produtos</p>
      { isLoading
        ? <Loading />
        : productsPage.map(({
          image, name, price, priceMember, priceNonMember, discount, id,
        }) => (
          <div key={id}>
            <div>
              <a href={`/produto/${id}`}>
                <img alt={name} src={image} />
                <p>{name}</p>
              </a>
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
        { page > 1 ? <button type="button" value={page - 1} onClick={(e) => changePage(e)}>&lt;&lt; Anterior</button>
          : <p> </p> }
        <button type="button" value={page} onClick={(e) => changePage(e)}>{page}</button>
        { page + 1 <= numberOPages ? <button type="button" value={page + 1} onClick={(e) => changePage(e)}>{page + 1}</button>
          : <p> </p> }
        { page + 2 <= numberOPages ? <button type="button" value={page + 2} onClick={(e) => changePage(e)}>{page + 2}</button>
          : <p> </p> }
        <p>...</p>
        { page + 1 <= numberOPages ? <button type="button" value={page + 1} onClick={(e) => changePage(e)}>Próximo &gt;&gt;</button>
          : <p> </p> }
      </div>
    </>
  );
}

export default ProductList;
