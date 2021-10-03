import React from 'react';

import './styles/MapInfo.scss';

const MapInfo = ({ shopInfo }) => {
  return (
    <div className="info-container">
      <div>{shopInfo.name}</div>
      <div>{shopInfo.content}</div>
      <div>{shopInfo.address}</div>
    </div>
  );
};

export default MapInfo;
