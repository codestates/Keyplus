import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import KakaoMap from '../components/KakaoMap';
import Info from '../components/MapInfo';

import exceptionAxios from 'axios';

import './styles/Map.scss';

const Map = () => {
  const [mapInfo, setMapInfo] = useState({});
  const [allMaps, setAllMaps] = useState([]);

  useEffect(async () => {
    try {
      const response = await exceptionAxios.get('/shops');
      setAllMaps(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="map-main">
        <KakaoMap setMapInfo={setMapInfo} allMaps={allMaps} />
        <Info mapInfo={mapInfo} />
      </main>
    </>
  );
};

export default Map;
