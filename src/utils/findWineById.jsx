const findWineById = (response, userId) => {
  const product = response.find((wine) => wine.id === userId);
  return product;
};

export default findWineById;
