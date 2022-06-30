const fetchWine = async (page, limit) => {
  const url = `https://wine-back-test.herokuapp.com/products?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

export default fetchWine;
