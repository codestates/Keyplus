import React, { useEffect, useRef, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

import Question1 from '../components/Questions/Question1';
import Question2 from '../components/Questions/Question2';
import Question3 from '../components/Questions/Question3';
import Question4 from '../components/Questions/Question4';
import Question5 from '../components/Questions/Question5';
import Question6 from '../components/Questions/Question6';

// [설문조사 필터링]

// 1. switch
//     - 저소음적축 true 또는 적축 true 1
//     - 갈축 true 2
//     - 흑축 true 3
//     - 청축 true 4
// 2. color
//     - 다채 1
//     - 무채 0
// 3. backlight
// 4. tenkey
// 5. bluetooth
// 6. price (보내진 값 이하로)

//     <back으로 보내는 데이터 형식>

//     { switch: 1, color: 1, backlight: 1, tenkey: 1, bluetooth: 2, price: 100000}

//     <Front>

//     1. 인풋 - 최대 금액 직접 입력
//     2. 버튼 - 최대 예산 5만원 / 10만원 / 15만원 / 20만원
const Survey = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const [sound, setSound] = useState(null);
  const [color, setColor] = useState(null);
  const [backlight, setBacklight] = useState(null);
  const [tenkey, setTenkey] = useState(null);
  const [bluetooth, setBluetooth] = useState(null);
  const [price, setPrice] = useState(null);

  const onClickStartBtn = () => {
    setIsStarted(true);
  };

  const onClickSound = (res) => {
    setSound(res);
  };

  const onClickColor = (res) => {
    setColor(res);
  };

  const onClickBacklight = (res) => {
    setBacklight(res);
  };

  const onClickTenkey = (res) => {
    setTenkey(res);
  };

  const onClickBluetooth = (res) => {
    setBluetooth(res);
  };

  const onClickPrice = (res) => {
    setPrice(res);
  };

  const mounted = useRef(false);

  const delay = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('2초가 지났습니다!');
      }, 2000);
    });
  };

  useEffect(async () => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      console.log('2초 기다기리기를 시작합니다!');
      setIsLoading(true);
      try {
        // const response = await axios....;
        const comment = await delay();
        console.log(comment);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [price]);

  if (!isStarted) {
    return (
      <>
        <button onClick={() => onClickStartBtn()}>START</button>
      </>
    );
  } else {
    if (sound === null) {
      return (
        <>
          <ProgressBar completed={16} bgColor="#647C90" baseBgColor="#dfdfdf" />
          <Question1 onClickSound={onClickSound} />
        </>
      );
    } else if (color === null) {
      return (
        <>
          <ProgressBar completed={32} bgColor="#647C90" baseBgColor="#dfdfdf" />
          <Question2 onClickColor={onClickColor} />
        </>
      );
    } else if (backlight === null) {
      return (
        <>
          <ProgressBar completed={48} bgColor="#647C90" baseBgColor="#dfdfdf" />
          <Question3 onClickBacklight={onClickBacklight} />
        </>
      );
    } else if (tenkey === null) {
      return (
        <>
          <ProgressBar completed={64} bgColor="#647C90" baseBgColor="#dfdfdf" />
          <Question4 onClickTenkey={onClickTenkey} />
        </>
      );
    } else if (bluetooth === null) {
      return (
        <>
          <ProgressBar completed={80} bgColor="#647C90" baseBgColor="#dfdfdf" />
          <Question5 onClickBluetooth={onClickBluetooth} />
        </>
      );
    } else if (price === null) {
      return (
        <>
          <ProgressBar
            completed={100}
            bgColor="#647C90"
            baseBgColor="#dfdfdf"
          />
          <Question6 onClickPrice={onClickPrice} />
        </>
      );
    } else {
      return (
        <>
          {isLoading ? (
            <div>잠시만 기다려주세요..</div>
          ) : (
            <div>당신의 결과는~~~</div>
          )}
        </>
      );
    }
  }
};

export default Survey;
