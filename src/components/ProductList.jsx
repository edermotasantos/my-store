import React, { useContext, useEffect } from 'react';
import {
  Button,
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import MyStoreContext from '../context/MyStoreContext';
import Loading from './Loading';
import RequestWineAPI from '../services/requestWineAPI';
import paginationByFilter from '../utils/paginationByFilter';
import findWineById from '../utils/findWineById';

function ProductList() {
  const { page, setPage } = useContext(MyStoreContext);
  const { productsPage, setProductsPage } = useContext(MyStoreContext);
  const { isLoading, setIsLoading } = useContext(MyStoreContext);
  const { limit, setLimit } = useContext(MyStoreContext);
  const { priceFilter, setPriceFilter } = useContext(MyStoreContext);
  const { numberOPages, setNumberOPages } = useContext(MyStoreContext);
  const { nameFilter } = useContext(MyStoreContext);
  const { insideTheCart, setInsideTheCart } = useContext(MyStoreContext);
  const { userName } = useContext(MyStoreContext);
  const { cart, setCart } = useContext(MyStoreContext);
  const { count, setCount } = useContext(MyStoreContext);
  const { setTotalItemsAddedToCart } = useContext(MyStoreContext);

  const productsAddedToCart = insideTheCart;

  const currentNumberOfPages = async (data) => {
    const newNumberOfPages = Math.ceil((data.length) / limit);
    if (newNumberOfPages !== numberOPages) setNumberOPages(newNumberOfPages);
  };

  const getWine = async (pageNumber, limitNumber) => {
    const response = await RequestWineAPI.fetchWine(pageNumber, limitNumber);
    const data = await RequestWineAPI.fetchWineDetails();
    await currentNumberOfPages(data);
    setIsLoading(false);
    setProductsPage(response);
  };

  const getWineByFilter = async ({ target: { value } }) => {
    const price = JSON.parse(value);
    const response = await RequestWineAPI.fetchWineDetails();
    let dataFilteredByPrice = '';
    setIsLoading(true);

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
    setPage(1);
    await currentNumberOfPages(dataFilteredByPrice);
    const wineFilteredByPrice = await paginationByFilter(dataFilteredByPrice, page, limit);
    setIsLoading(false);
    setProductsPage(wineFilteredByPrice);
  };

  if (isLoading === true) {
    useEffect(() => {
      const currentHeight = window.screen.height;
      const currentWidth = window.screen.width;

      if (limit > 8 && (currentHeight < 900 || currentWidth < 1440)) {
        setLimit(8);
        setIsLoading(true);
      }
      if (!priceFilter && !nameFilter) getWine(page, limit);
      if (priceFilter && !nameFilter) {
        const wineFilteredByPrice = paginationByFilter(priceFilter, page, limit);
        setIsLoading(false);
        setProductsPage(wineFilteredByPrice);
      }
      if (!priceFilter && nameFilter) {
        const wineFilteredByName = paginationByFilter(nameFilter, page, limit);
        setIsLoading(false);
        setProductsPage(wineFilteredByName);
      }
    }, []);
  }

  const changePage = ({ target: { value } }) => {
    const newValue = parseInt(value, 10);
    setPage(newValue);
    setIsLoading(true);
  };

  const addToCart = async ({ target: { value } }) => {
    const id = parseInt(value, 10);
    if (productsAddedToCart[id] !== undefined) {
      productsAddedToCart[id] += 1;
    }
    if (productsAddedToCart[id] === undefined) {
      productsAddedToCart[id] = 1;
      const response = await RequestWineAPI.fetchWineDetails(id);
      const userId = parseInt(id, 10);
      const product = findWineById(response, userId);
      setCart((prevState) => ({
        ...prevState,
        [count]: product,
      }));
      const stringStorage = JSON.stringify(cart);
      localStorage.setItem(`${userName}sCart`, stringStorage);
      setCount((prevState) => prevState + 1);
    }
    setInsideTheCart(
      { ...productsAddedToCart },
    );
    setTotalItemsAddedToCart((prevState) => prevState + 1);
  };

  return (
    <Grid container>
      <Grid>
        <Grid sx={{ p: 2 }}>
          <Typography>Refine sua busca</Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => {
                getWineByFilter(e);
              }}
            >
              <FormLabel>Por preço</FormLabel>
              <FormControlLabel value="100" control={<Radio />} label="Até R$100" />
              <FormControlLabel value="[100, 200]" control={<Radio />} label="R$100 à R$200" />
              <FormControlLabel value="200" control={<Radio />} label="Acima de R$200" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Typography>produtos</Typography>
        <Grid container spacing={2}>
          { isLoading
            ? <Loading />
            : productsPage.map(({
              image, name, price, priceMember, priceNonMember, discount, id,
            }) => (
              <Grid
                item
                key={id}
                xs={3}
                md={2.4}
                lg={3}
                sx={{ p: 2 }}
              >
                <Card sx={{ maxWidth: 315, p: 2 }}>
                  <CardActionArea>
                    <a href={`/produto/${id}`}>
                      <CardMedia
                        component="img"
                        alt={name}
                        image={image}
                        sx={{ maxWidth: 150, p: 2 }}
                      />
                      <Typography gutterBottom variant="h6" component="div">{name}</Typography>
                    </a>
                    <CardContent>
                      <Grid>
                        <Typography variant="body2" color="text.secondary">{`R$${price}`.replace('.', ',')}</Typography>
                        <Typography variant="body2" color="text.secondary">{`${discount}% OFF`}</Typography>
                      </Grid>
                      <Typography variant="body2" color="text.secondary">{`SÓCIO WINE R$${priceMember}`.replace('.', ',')}</Typography>
                      <Typography variant="body2" color="text.secondary">{`NÃO SÓCIO R$${priceNonMember}`.replace('.', ',')}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Button
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                  variant="contained"
                  color="success"
                  value={id}
                  onClick={(e) => addToCart(e)}
                >
                  adicionar
                </Button>
              </Grid>
            ))}
        </Grid>
        <div>
          { page > 1 ? <Button type="button" value={page - 1} onClick={(e) => changePage(e)}>&lt;&lt; Anterior</Button>
            : <Typography> </Typography> }
          <Button variant="contained" type="button" value={page} onClick={(e) => changePage(e)}>{page}</Button>
          { page + 1 <= numberOPages ? <Button variant="outlined" type="button" value={page + 1} onClick={(e) => changePage(e)}>{page + 1}</Button>
            : <Typography> </Typography> }
          { page + 2 <= numberOPages ? <Button variant="outlined" type="button" value={page + 2} onClick={(e) => changePage(e)}>{page + 2}</Button>
            : <Typography> </Typography> }
          <Typography>...</Typography>
          { page + 1 <= numberOPages
            ? <Button value={page + 1} onClick={(e) => changePage(e)}>Próximo &gt;&gt;</Button>
            : <Typography> </Typography> }
        </div>
      </Grid>
    </Grid>
  );
}

export default ProductList;
