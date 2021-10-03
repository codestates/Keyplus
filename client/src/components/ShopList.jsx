import React, { useEffect, useState, useRef, useCallback } from 'react';

import './styles/ShopList.scss';

const ShopList = ({
  allShops,
  selectedShopIdx,
  setSelectedShopIdx,
  map,
  setMap,
  containerRef,
  kakao,
  markers,
  customOverlays,
}) => {
  const [clickedShopInList, setClickedShopInList] = useState(-1);

  const mounted = useRef(false);
  useEffect(async () => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      try {
        //! 센터 설정
        const latLng = new kakao.maps.LatLng(
          allShops[selectedShopIdx].latitude,
          allShops[selectedShopIdx].longitude
        );

        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        map.panTo(latLng);

        //TODO 클릭한 샵 마커 표시
      } catch (err) {
        console.log(err);
      }
    }
  }, [clickedShopInList]);

  const onClickShop = useCallback(
    (idx) => {
      //! 리스트 표시용
      setSelectedShopIdx(idx);

      //! 센터 정렬용
      setClickedShopInList(idx);

      //! 클릭된 마커의 오버레이 표시
      customOverlays[idx].setMap(map);

      //! 클릭된 마커 외의 오버레이는 제거하기
      customOverlays.forEach((customOverlay, cIdx) => {
        if (idx !== cIdx) {
          customOverlay.setMap(null);
        }
      });
    },
    [customOverlays]
  );

  return (
    <>
      <aside className="shop-list">
        <h1>타건샵 리스트</h1>
        <ul className="shop-info-area">
          {allShops.map((info, idx) => (
            <li
              key={`${info.name}_${idx}`}
              className={
                idx === selectedShopIdx ? 'shop-info selected' : 'shop-info'
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
