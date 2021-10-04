import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import ShopList from '../components/ShopList';

import exceptionAxios from 'axios';

import './styles/TypingShop.scss';

const TypingShop = () => {
  const [allShops, setAllShops] = useState([]);
  const [selectedShopIdx, setSelectedShopIdx] = useState(-1);

  const [map, setMap] = useState();
  const containerRef = useRef();
  const { kakao } = window;

  const [markers, setMarkers] = useState([]);
  const [customOverlays, setCustomOverlays] = useState([]);

  useEffect(async () => {
    try {
      //! API Call
      const response = await exceptionAxios.get('/shops');
      setAllShops(response.data.data);

      //! state 말고 그냥 변수 shops에도 저장 (마커 찍기 위함)
      const allShopsV = response.data.data;

      //! 센터 설정
      const latLng = new kakao.maps.LatLng(
        37.53247258965998,
        126.96486479774572
      );
      const options = {
        center: latLng,
        level: 4,
      };

      //! 지도 생성
      const map = new kakao.maps.Map(containerRef.current, options);
      setMap(map);

      //! 줌 컨트롤러 추가
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      // 마커 이미지의 주소
      const imageSrc =
        'https://media.discordapp.net/attachments/880163201872961636/894293586533818428/3440906-direction-location-map-marker-navigation-pin_107531.png';
      const imageSize = new kakao.maps.Size(64, 69); // 마커 이미지의 크기
      const imageOption = { offset: new kakao.maps.Point(34, 69) }; // 마커 이미지의 옵션
      // 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      allShopsV.forEach((shop) => {
        //! 마커 생성
        const position = new kakao.maps.LatLng(shop.latitude, shop.longitude);
        const marker = new kakao.maps.Marker({
          position,
          clickable: true,
          image: markerImage, // 마커이미지 설정
        });

        // //! 마커 state에 저장
        setMarkers((markers) => [...markers, marker]);

        //! 해당 위치에 마커 설치
        marker.setMap(map);

        //! 커스텀 오버레이를 생성
        const content =
          '<div class="custom-overlay">' +
          `  <a href=https://map.kakao.com/link/map/${shop.name},${shop.latitude},${shop.longitude} target="_blank">` +
          `    <span class="title">${shop.name}</span>` +
          '  </a>' +
          '</div>';

        const customOverlay = new kakao.maps.CustomOverlay({
          position,
          content,
        });

        //! 커스텀 오버레이 state에 저장
        setCustomOverlays((customOverlays) => [
          ...customOverlays,
          customOverlay,
        ]);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleClick = useCallback(
    (idx) => {
      //! 리스트 표시용
      setSelectedShopIdx(idx);

      //! 클릭된 마커의 오버레이 표시
      customOverlays[idx].setMap(map);

      //! 클릭된 마커 외의 오버레이는 제거하기
      customOverlays.forEach((customOverlay, cIdx) => {
        if (idx !== cIdx) {
          customOverlay.setMap(null);
        }
      });
    },
    [customOverlays.length === 10]
  );

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      console.log(customOverlays);
      console.log(markers);
      markers.forEach((marker, idx) => {
        kakao.maps.event.addListener(marker, 'click', () => {
          handleClick(idx);
        });
      });
    }
  }, [customOverlays.length === 10]);

  return (
    <>
      <Header />
      <main className="map-main">
        <div className="map-container">
          <main className="map-area" ref={containerRef}></main>
          <ShopList
            allShops={allShops}
            selectedShopIdx={selectedShopIdx}
            setSelectedShopIdx={setSelectedShopIdx}
            map={map}
            setMap={setMap}
            containerRef={containerRef}
            kakao={kakao}
            markers={markers}
            customOverlays={customOverlays}
          />
        </div>
      </main>
    </>
  );
};

export default TypingShop;
