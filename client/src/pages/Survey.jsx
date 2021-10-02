import React, { useEffect, useRef, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Question1 from '../components/Survey/Question1';
import Question2 from '../components/Survey/Question2';
import Question3 from '../components/Survey/Question3';
import Question4 from '../components/Survey/Question4';
import Question5 from '../components/Survey/Question5';
import Question6 from '../components/Survey/Question6';

import './styles/Survey.scss';
import axios from '../utils/customAxios';

import { AiFillLeftSquare, AiFillRightSquare } from 'react-icons/ai';
import useWidthSize from '../hooks/useWidthSize';

// [설문조사 필터링]

const Survey = () => {
  // const [isLoading, setIsLoading] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [keyboards, setKeyboards] = useState(null);

  const [sound, setSound] = useState(null);
  const [color, setColor] = useState(null);
  const [backlight, setBacklight] = useState(null);
  const [tenkey, setTenkey] = useState(null);
  const [bluetooth, setBluetooth] = useState(null);
  const [price, setPrice] = useState(null);

  const onClickStartBtn = () => {
    setIsStarted(true);
  };

  const audio1 = new Audio('/boggle.mp3');
  const audio2 = new Audio('/nonclick.mp3');
  const audio3 = new Audio('/linear.mp3');
  const audio4 = new Audio('/click.mp3');

  const onClickSound = (res) => {
    setSound(res);
    // 1. switch
    //     - 저소음적축 true  1
    //     - 갈축 true 2
    //     - 흑축 true 또는 적축 true 3
    //     - 청축 true 4
    switch (res) {
      case 1:
        audio1.pause();
        break;
      case 2:
        audio2.pause();
        break;
      case 3:
        audio3.pause();
        break;
      case 4:
        audio4.pause();
        break;
      default:
        break;
    }
  };

  const onClickColor = (res) => {
    setColor(res);
    // 2. color
    //     - 다채 1
    //     - 무채 0
  };

  const onClickBacklight = (res) => {
    setBacklight(res);
    // 3. backlight
    //     - 있음 1
    //     - 없음 0
  };

  const onClickTenkey = (res) => {
    setTenkey(res);
    // 4. tenkey
    //     - 있음 1
    //     - 없음 0
  };

  const onClickBluetooth = (res) => {
    setBluetooth(res);
    // 5. bluetooth
    //     - 지원 1
    //     - 미지원 0
  };

  const onClickPrice = (res) => {
    setPrice(res);
    // 6. price (이하)
    //     - 50000
    //     - 100000
    //     - 150000
    //     - 200000
    //     - 300000
  };

  const mounted = useRef(false);

  // const delay = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve('2초가 지났습니다!');
  //     }, 2000);
  //   });
  // };

  useEffect(async () => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      try {
        const response = await axios.post('/keyboards/filter', {
          sound,
          color,
          backlight,
          tenkey,
          bluetooth,
          price,
        });
        const filteredKeyboards = response.data.data;
        setKeyboards(filteredKeyboards);
      } catch (err) {
        console.log(err);
      }
    }
  }, [price]);

  if (!isStarted) {
    return (
      <>
        <Header />
        <main className="survey">
          <div className="survey-main">
            <h2>
              맘에 쏙 드는 기계식 키보드, 찾기 어려우셨나요?
              <br />
              쉽고 간단한 테스트로 <br />
              나에게 맞는 키보드를 알아보세요.
            </h2>
            <div className="survey-button-wrapper">
              <button
                className="survey-button"
                onClick={() => onClickStartBtn()}
              >
                START
              </button>
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </>
    );
  } else {
    if (sound === null) {
      return (
        <>
          <Header />
          <main className="survey">
            <div className="progress-bar-wrapper">
              <ProgressBar
                labelSize="12px"
                completed={16}
                bgColor="#647C90"
                baseBgColor="#dfdfdf"
              />
            </div>
            <Question1
              onClickSound={onClickSound}
              audio1={audio1}
              audio2={audio2}
              audio3={audio3}
              audio4={audio4}
            />
            {/* <Question1 /> */}
            {/* <div className="question-button">
              <button className="previous-question-button">
                <AiFillLeftSquare className="icon" />
                <span className="text">이전 질문</span>
              </button>
              <button className="next-question-button">
                <span className="text">다음 질문</span>
                <AiFillRightSquare className="icon" />
              </button>
            </div> */}
          </main>
          {/* <Footer /> */}
        </>
      );
    } else if (color === null) {
      return (
        <>
          <Header />
          <main className="survey">
            <div className="progress-bar-wrapper">
              <ProgressBar
                labelSize="12px"
                completed={32}
                bgColor="#647C90"
                baseBgColor="#dfdfdf"
              />
            </div>
            <Question2 onClickColor={onClickColor} />
          </main>
          {/* <Footer /> */}
        </>
      );
    } else if (backlight === null) {
      return (
        <>
          <Header />
          <main className="survey">
            <div className="progress-bar-wrapper">
              <ProgressBar
                labelSize="12px"
                completed={48}
                bgColor="#647C90"
                baseBgColor="#dfdfdf"
              />
            </div>
            <Question3 onClickBacklight={onClickBacklight} />
          </main>
          {/* <Footer /> */}
        </>
      );
    } else if (tenkey === null) {
      return (
        <>
          <Header />
          <main className="survey">
            <div className="progress-bar-wrapper">
              <ProgressBar
                labelSize="12px"
                completed={64}
                bgColor="#647C90"
                baseBgColor="#dfdfdf"
              />
            </div>
            <Question4 onClickTenkey={onClickTenkey} />
          </main>
          {/* <Footer /> */}
        </>
      );
    } else if (bluetooth === null) {
      return (
        <>
          <Header />
          <main className="survey">
            <div className="progress-bar-wrapper">
              <ProgressBar
                labelSize="12px"
                completed={80}
                bgColor="#647C90"
                baseBgColor="#dfdfdf"
              />
            </div>
            <Question5 onClickBluetooth={onClickBluetooth} />
          </main>
          {/* <Footer /> */}
        </>
      );
    } else if (price === null) {
      return (
        <>
          <Header />
          <main className="survey">
            <div className="progress-bar-wrapper">
              <ProgressBar
                labelSize="12px"
                completed={100}
                bgColor="#647C90"
                baseBgColor="#dfdfdf"
              />
            </div>
            <Question6 onClickPrice={onClickPrice} />
          </main>
          {/* <Footer /> */}
        </>
      );
    } else {
      return (
        <>
          <Header />
          <main className="survey">
            {/* {isLoading ? ( */}
            {/* <div>잠시만 기다려주세요..</div> */}
            {/* ) : ( */}
            {/* <div>당신의 결과는~~~</div> */}
            {/* )} */}
            {keyboards && (
              <>
                {keyboards.map((keyboard, idx) => (
                  <div key={`${keyboard.name}_${keyboard.idx}`}>
                    {`${keyboard.brand} ${keyboard.name}`}
                  </div>
                ))}
              </>
            )}
          </main>
          {/* <Footer /> */}
        </>
      );
    }
  }
};

export default Survey;
