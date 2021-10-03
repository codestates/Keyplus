import React, { useCallback } from 'react';

import './styles/ShopList.scss';

const ShopList = ({ allShops, selectedShopId, setSelectedShopId }) => {
  const onClickShop = useCallback((idx) => {
    console.log('클릭 됐다', idx);
    setSelectedShopId(idx + 1);
  }, []);

  return (
    <>
      <aside className="shop-list">
        <h1>타건샵 리스트</h1>
        <ul className="shop-info-area">
          {allShops.map((info, idx) => (
            <li
              key={`${info.name}_${idx}`}
              className={
                idx + 1 === selectedShopId ? 'shop-info selected' : 'shop-info'
              }
              onClick={() => onClickShop(idx)}
            >
              <div className="shop-info-name">{info.name}</div>
              <div className="shop-info-address">{info.address}</div>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default ShopList;
