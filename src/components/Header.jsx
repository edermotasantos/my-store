import React, { useContext } from 'react';
import MyStoreContext from '../context/MyStoreContext';
import RequestWineAPI from '../services/requestWineAPI';
import paginationByFilter from '../utils/paginationByFilter';

function Header() {
  const { page, setPage } = useContext(MyStoreContext);
  const { search, setSearch } = useContext(MyStoreContext);
  const { setIsLoading } = useContext(MyStoreContext);
  const { setNameFilter } = useContext(MyStoreContext);
  const { limit } = useContext(MyStoreContext);
  const { numberOPages, setNumberOPages } = useContext(MyStoreContext);
  const { setProductsPage } = useContext(MyStoreContext);
  const { newSearch } = search;

  const handleChange = ({ target: { name, value } }) => {
    setSearch({ [name]: value.toLowerCase() });
  };

  const currentNumberOfPages = async (data) => {
    if (data !== numberOPages) {
      const newNumberOfPages = Math.ceil((data.length) / limit);
      setNumberOPages(newNumberOfPages);
    }
  };

  const handleClick = async () => {
    const response = await RequestWineAPI.fetchWineDetails();
    setIsLoading(true);
    const dataFilteredByName = response.filter((item) => (
      item.name.toLowerCase().includes(search.newSearch)
    ));
    setNameFilter(dataFilteredByName);
    setPage(1);
    await currentNumberOfPages(dataFilteredByName);
    const wineFilteredByName = paginationByFilter(dataFilteredByName, page, limit);
    setIsLoading(false);
    setProductsPage(wineFilteredByName);
  };

  return (
    <div>
      <h1>Wine</h1>
      <p>Clube</p>
      <p>Loja</p>
      <p>Produtores</p>
      <p>Ofertas</p>
      <p>Eventos</p>
      <input type="text" name="newSearch" value={newSearch} onChange={(e) => handleChange(e)} />
      <button type="button" onClick={(e) => handleClick(e)}>pesquisar</button>
    </div>
  );
}

export default Header;
