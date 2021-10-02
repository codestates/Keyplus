import React, { useEffect, useState, useRef } from 'react';
import exceptionAxios from 'axios';
import './styles/KakaoMap.scss';

const KakaoMap = ({ setMapInfo }) => {
  const [coordinate, setCoordinate] = useState([]); // db의 정보들.(name, content, latitude, longitude)
  const [check, setCheck] = useState({}); // aside에 필요한 객체 {0: false, 1: false ...}
  const [map, setMap] = useState();
  const containerRef = useRef();
  // console.log(containerRef);

  const { kakao } = window;

  const handleClick = (e, index) => {
    console.log('클릭함');
    setCheck((check) => ({ ...check, [index]: !check[index] }));
    // setMapInfo(e);
    // {0: false, 1: false ...} aside.content생성, 삭제.
  };

  useEffect(async () => {
    try {
      const map = await exceptionAxios.get('/maps').then((result) => {
        setCoordinate(result.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // 지도 생성.
    const latLng = new window.kakao.maps.LatLng(
      37.53247258965998,
      126.96486479774572
    );
    const options = {
      center: latLng,
      level: 4,
    };
    let map = new kakao.maps.Map(containerRef.current, options);
    setMap(map);
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  useEffect(() => {
    // 지도에 marker생성.
    let obj = {}; // {0: false, 1: false ...} marker클릭시 true로 바뀜.
    coordinate.forEach((el, index) => {
      obj[index] = false;

      const latLng = new kakao.maps.LatLng(el.latitude, el.longitude);
      let marker = new kakao.maps.Marker({
        position: latLng,
        clickable: true,
      });

      marker.setMap(map); // 위도에 해당하는 위치에 marker 설치.

      const container = document.createElement('div'); // marker위 content생성. (63 ~ 78)
      const content = document.createElement('div');
      const contentName = document.createElement('div');
      const closeButton = document.createElement('button');

      container.append(content);
      content.append(contentName);
      content.append(closeButton);

      container.className = 'map-container';
      content.className = 'map-content';
      contentName.className = 'map-content-name';
      contentName.textContent = el.name;
      closeButton.className = 'map-content-close';
      closeButton.textContent = '✕';
      closeButton.onclick = function () {
        closeOverlay();
        handleClick(el, index);
      };

      const overlay = new kakao.maps.CustomOverlay({
        // marker 커스텀.
        content: container,
        position: latLng,
      });

      function closeOverlay() {
        // x클릭시 content 삭제.
        obj[index] = false;
        overlay.setMap(null);
        setMapInfo('');
      }

      kakao.maps.event.addListener(marker, 'click', function () {
        // 클릭이벤트.
        if (obj[index]) {
          // 해당하는 인덱스를 true, false로 content 생성, 삭제.
          closeOverlay();
          handleClick(el, index);
        } else {
          obj[index] = true;
          overlay.setMap(map); // 해당 마커의 content 생성.
          handleClick(el, index); // 해당 aside 생성.
          setMapInfo(el);
        }
      });

      kakao.maps.event.addListener(marker, 'mouseover', function () {
        // 마우스 이벤트.
        if (obj[index]) {
          return;
        }
        overlay.setMap(map);
      });

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        // 마우스 이벤트.
        if (obj[index]) {
          return;
        }
        overlay.setMap(null);
      });
    });
  }, [map, coordinate, setMapInfo]);

  return (
    <>
      <div className="container">
        <div className="aside">
          {/* {coordinate.map((el, index) => {
            return (
              <>
                <div
                  key={el.name}
                  className="content"
                  // onClick={(e) => handleClick(e, index)}
                >
                  {el.name}
                </div>
                <div
                  className={check[index] ? 'open-content' : 'close-content'}
                >
                  <div>
                    <div>{el.content}</div>
                    <div>{el.address}</div>
                  </div>
                </div>
              </>
            );
          })} */}
        </div>
        <div
          id="map"
          // style={{ width: '1000px', height: '650px' }}
          style={{ width: '100%', height: '800px' }}
          ref={containerRef}
        ></div>
      </div>
    </>
  );
};

export default KakaoMap;
