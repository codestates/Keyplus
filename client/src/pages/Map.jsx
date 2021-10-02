import React, { useState } from 'react';
import KakaoMap from '../components/kakaomap';
import Info from '../components/info';

const Map = () => {
  const [mapInfo, setMapInfo] = useState({});

  return (
    <div>
      <KakaoMap setMapInfo={setMapInfo} />
      <Info mapInfo={mapInfo} />
    </div>
  );
};

export default Map;
