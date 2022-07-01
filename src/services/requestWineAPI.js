const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

const fetchWine = async (page, limit) => {
  const url = `https://wine-back-test.herokuapp.com/products?page=${page}&limit=${limit}`;
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data.items;
};

const fetchWineDetails = async () => {
  const url = 'https://wine-back-test.herokuapp.com/products';
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data.items;
};

export default {
  fetchWine,
  fetchWineDetails,
};
