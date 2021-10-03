import React, { useEffect, useState, useRef, useCallback } from 'react';
import exceptionAxios from 'axios';

import './styles/Map.scss';

import { FaRegKeyboard } from 'react-icons/fa';

const Map = ({ allShops, selectedShopId, setSelectedShopId }) => {
  const [check, setCheck] = useState({}); // aside에 필요한 객체 {0: false, 1: false ...}
  const [map, setMap] = useState();
  const containerRef = useRef();

  const { kakao } = window;

  // const handleClick = (e, index) => {
  //   console.log('클릭함');
  //   setCheck((check) => ({ ...check, [index]: !check[index] }));
  // };

  const handleClick = useCallback((idx) => {
    console.log('클릭 됐다', idx);
    setSelectedShopId(idx + 1);
  }, []);

  useEffect(async () => {
    try {
      //! 지도 생성
      const latLng = new window.kakao.maps.LatLng(
        37.53247258965998,
        126.96486479774572
      );
      const options = {
        center: latLng,
        level: 4,
      };
      const map = new kakao.maps.Map(containerRef.current, options);
      setMap(map);

      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    //! 지도에 marker생성.
    const obj = {}; // {0: false, 1: false ...} marker클릭시 true로 바뀜.
    allShops.forEach((el, index) => {
      obj[index] = false;

      const latLng = new kakao.maps.LatLng(el.latitude, el.longitude);
      const marker = new kakao.maps.Marker({
        position: latLng,
        clickable: true,
      });

      marker.setMap(map); // 위도에 해당하는 위치에 marker 설치.

      const container = document.createElement('div'); // marker위 content생성. (63 ~ 78)
      const content = document.createElement('div');
      const contentName = document.createElement('span');
      const contentLink = document.createElement('a');
      const closeButton = document.createElement('button');

      contentLink.setAttribute(
        'href',
        `https://map.kakao.com/link/to/${el.name},${el.latitude},${el.longitude}`
      );

      container.append(content);
      content.append(contentName);
      content.append(contentLink);
      content.append(closeButton);

      container.className = 'map-info-container';
      content.className = 'map-info-content';

      contentName.className = 'map-info-content-name';
      contentName.textContent = `${el.name}`;

      contentLink.className = 'map-info-content-link';
      contentLink.textContent = `길찾기`;

      closeButton.className = 'map-info-content-close';
      closeButton.textContent = '✕';

      const closeOverlay = () => {
        // x클릭시 content 삭제.
        obj[index] = false;
        overlay.setMap(null);
        // setShopInfo('');
      };

      closeButton.onclick = () => {
        closeOverlay();
        // handleClick(el, index);
        handleClick(index);
      };

      const overlay = new kakao.maps.CustomOverlay({
        // marker 커스텀.
        content: container,
        position: latLng,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        // 클릭이벤트.
        if (obj[index]) {
          // 해당하는 인덱스를 true, false로 content 생성, 삭제.
          closeOverlay();
          // handleClick(el, index);
        } else {
          obj[index] = true;
          overlay.setMap(map); // 해당 마커의 content 생성.
          handleClick(index); // 해당 aside 생성.
          // setShopInfo(el);
        }
      });

      kakao.maps.event.addListener(marker, 'mouseover', () => {
        // 마우스 이벤트.
        if (obj[index]) {
          return;
        }
        overlay.setMap(map);
      });

      kakao.maps.event.addListener(marker, 'mouseout', () => {
        // 마우스 이벤트.
        if (obj[index]) {
          return;
        }
        overlay.setMap(null);
      });
    });
  }, [map, allShops]);

  return (
    <>
      <main className="map-area" ref={containerRef}></main>
    </>
  );
};

export default Map;
