import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyStoreContext from '../context/MyStoreContext';
import Loading from './Loading';
import RequestWineAPI from '../services/requestWineAPI';
import findWineById from '../utils/findWineById';

function ProductDetails() {
  const { isLoading } = useContext(MyStoreContext);
  const { wineDetails, setWineDetails } = useContext(MyStoreContext);
  const { id } = useParams();

  const getWineDetails = async () => {
    const response = await RequestWineAPI.fetchWineDetails(id);
    const userId = parseInt(id, 10);
    const product = findWineById(response, userId);
    setWineDetails(product);
  };

  if (isLoading === true) {
    useEffect(() => {
      getWineDetails();
    }, []);
  }

  return (
    <>
      <p> </p>
      { !wineDetails
        ? <Loading />
        : (
          <div>
            <div>
              <img alt={wineDetails.name} src={wineDetails.image} />
              <div>
                <p>Vinhos</p>
                <p>{wineDetails.country}</p>
                <p>{wineDetails.region}</p>
              </div>
              <p>{wineDetails.name}</p>
              <div>
                <p>{wineDetails.country}</p>
                <p>{wineDetails.type}</p>
                <p>{wineDetails.classification}</p>
                <p>{wineDetails.region}</p>
                <p>{`${wineDetails.size} ml`}</p>
                <p>{wineDetails.rating}</p>
                <p>{`(${wineDetails.avaliations})`}</p>
              </div>
              <p>{`R$${wineDetails.priceMember}`.replace('.', ',')}</p>
              <p>{`NÃO SÓCIO R$${wineDetails.priceNonMember}/UN.`.replace('.', ',')}</p>
              <h3>Comentário do Sommelier</h3>
              <p>{wineDetails.sommelierComment}</p>
            </div>
            <button type="button">adicionar</button>
          </div>
        )}
    </>
  );
}

export default ProductDetails;
