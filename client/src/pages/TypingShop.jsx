import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Map from '../components/Map';
// import Info from '../components/Info';
import ShopList from '../components/ShopList';

import exceptionAxios from 'axios';

import './styles/TypingShop.scss';

const TypingShop = () => {
  const [allShops, setAllShops] = useState([]);
  // const [shopInfo, setShopInfo] = useState({});
  const [selectedShopId, setSelectedShopId] = useState(0);

  useEffect(async () => {
    try {
      //! API Call
      const response = await exceptionAxios.get('/shops');
      setAllShops(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="map-main">
        <div className="map-container">
          <Map
            allShops={allShops}
            selectedShopId={selectedShopId}
            setSelectedShopId={setSelectedShopId}
          />
          <ShopList
            allShops={allShops}
            selectedShopId={selectedShopId}
            setSelectedShopId={setSelectedShopId}
          />
          {/* <Info shopInfo={shopInfo} /> */}
        </div>
      </main>
    </>
  );
};

export default TypingShop;
