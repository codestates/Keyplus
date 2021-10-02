import React from 'react';

const MapInfo = ({ mapInfo }) => {
  return (
    <div className="info-container">
      <div>{mapInfo.name}</div>
      <div>{mapInfo.content}</div>
      <div>{mapInfo.address}</div>
    </div>
  );
};

export default MapInfo;
