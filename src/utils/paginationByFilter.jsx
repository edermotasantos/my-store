const paginationByFilter = (dataFilteredByName, page, limit) => {
  let start = 0;
  let end = limit;
  if (page > 1) {
    start = limit + 1;
    end = start + limit;
  }
  const wineFilteredByName = dataFilteredByName.slice(start, end);
  return wineFilteredByName;
};

export default paginationByFilter;
