import React, { useEffect, useRef, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { useSelector } from 'react-redux';

import exceptionAxios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Question1 from '../components/Survey/Question1';
import Question2 from '../components/Survey/Question2';
import Question3 from '../components/Survey/Question3';
import Question4 from '../components/Survey/Question4';
import Question5 from '../components/Survey/Question5';
import Question6 from '../components/Survey/Question6';
import useWidthSize from '../hooks/useWidthSize';
import KeyboardCard from './KeyboardCard';

import './styles/Survey.scss';

import { Spin } from 'antd';
import { AiFillLeftSquare, AiFillRightSquare } from 'react-icons/ai';

// [설문조사 필터링]

const Survey = () => {
  const userNickname = useSelector((state) => state.user?.nickname);

  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [keyboards, setKeyboards] = useState(null);

  const [sound, setSound] = useState(null);
  const [color, setColor] = useState(null);
  const [backlight, setBacklight] = useState(null);
  const [tenkey, setTenkey] = useState(null);
  const [bluetooth, setBluetooth] = useState(null);
  const [price, setPrice] = useState(null);

  const width = useWidthSize(768);

  const onClickStartBtn = () => {
    setIsStarted(true);
  };

  const audio1 = new Audio('/boggle.mp3');
  const audio2 = new Audio('/nonclick.mp3');
  const audio3 = new Audio('/linear.mp3');
  const audio4 = new Audio('/click.mp3');

  useEffect(() => {
    return () => {
      audio1.pause();
      audio1.currentTime = 0;
      audio2.pause();
      audio2.currentTime = 0;
      audio3.pause();
      audio3.currentTime = 0;
      audio4.pause();
      audio4.currentTime = 0;
    };
  }, [audio1, audio2, audio3, audio4]);

  const onClickSound = (res) => {
    setSound(res);
    switch (res) {
      case 1:
        audio1.pause();
        audio1.currentTime = 0;
        break;
      case 2:
        audio2.pause();
        audio2.currentTime = 0;
        break;
      case 3:
        audio3.pause();
        audio3.currentTime = 0;
        break;
      case 4:
        audio4.pause();
        audio4.currentTime = 0;
        break;
      default:
        break;
    }
  };

  const convertSoundToText = (sound) => {
    switch (sound) {
      case 1:
        return '보글보글 소리가 나는 저소음 적축, ';

      case 2:
        return '도각도각 소리가 나는 갈축, ';

      case 3:
        return '서걱서걱 소리가 나는 적축과 흑축, ';

      case 4:
        return '찰칵찰칵 소리가 나는 청축, ';

      default:
        return;
    }
  };

  const onClickColor = (res) => {
    setColor(res);
  };

  const convertColorToText = (color) => {
    if (color === 1) {
      return '유채색의, ';
    } else if (color === 2) {
      return '모든 색의,';
    }
    return '무채색의, ';
  };

  const onClickBacklight = (res) => {
    setBacklight(res);
  };

  const convertBacklightToText = (backlight) => {
    if (backlight === 1) {
      return '백라이트가 있는, ';
    } // 2
    return '백라이트가 상관없는, ';
  };

  const onClickTenkey = (res) => {
    setTenkey(res);
  };

  const convertTenkeyToText = (tenkey) => {
    if (tenkey === 1) {
      return '텐키가 있는, ';
    } else if (tenkey === 2) {
      return '텐키가 상관없는, ';
    }
    return '텐키가 없는, ';
  };

  const onClickBluetooth = (res) => {
    setBluetooth(res);
  };

  const convertBluetoothToText = (blutetooth) => {
    if (blutetooth === 1) {
      return '블루투스를 지원하는, ';
    } // 2
    return '블루투스가 상관없는, ';
  };

  const onClickPrice = (res) => {
    setPrice(res);
  };

  const convertPriceToText = (price) => {
    switch (price) {
      case 50000:
        return '5만원 이하';

      case 100000:
        return '10만원 이하';

      case 150000:
        return '15만원 이하';

      case 200000:
        return '20만원 이하';
      case 30000:
        return '30만원 이하';

      default:
        return '가격대가 상관없는';
    }
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
      try {
        setIsLoading(true);
        const [response] = await Promise.all([
          exceptionAxios.post('/keyboards/filter', {
            sound,
            color,
            backlight,
            tenkey,
            bluetooth,
            price,
          }),
          delay(),
        ]);
        const filteredKeyboards = response.data.data;
        setKeyboards(filteredKeyboards);
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
        <Header />
        <main
          className="survey start"
          style={{
            backgroundImage: "url('/survey-background.png')",
          }}
        >
          <div className="survey-start-main">
            <h2>
              맘에 쏙 드는 기계식 키보드
              {width > 768 ? `, ` : <br />}
              찾기 어려우셨나요?
              <br />
              {width > 768 ? null : <br />}
              쉽고 간단한 테스트로
              {width > 768 ? ` ` : <br />}
              나에게 맞는 키보드를 알아보세요.
            </h2>
            <button className="survey-start-button" onClick={onClickStartBtn}>
              START
            </button>
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
            {/* //! 결과가 0개일 때 어떻게 보여줄지  */}
            {isLoading ? (
              <>
                <span>취향 분석 중</span>
                <Spin />
              </>
            ) : (
              <>
                {keyboards && (
                  <div className="survey-result-main">
                    <p>
                      {userNickname ? userNickname : '비회원'}님은
                      {`${convertSoundToText(sound)} ${convertColorToText(
                        color
                      )} ${convertBacklightToText(
                        backlight
                      )} ${convertTenkeyToText(
                        tenkey
                      )} ${convertBluetoothToText(
                        bluetooth
                      )} ${convertPriceToText(
                        price
                      )} 키보드 취향을 가지셨네요.`}
                    </p>
                    {keyboards.length !== 0 ? (
                      <>
                        <p>
                          {userNickname ? userNickname : '비회원'}님에게 딱 맞는
                          {width > 768 ? ` ` : <br />} {keyboards.length}개의
                          키보드를 찾았습니다!
                        </p>
                        <p>보다 더 많은 키보드 구경하러 가기</p>
                        <div className="survey-result-list">
                          {keyboards.map((keyboard) => (
                            <KeyboardCard
                              keyboard={keyboard}
                              key={`${keyboard.id}_${keyboard.name}`}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <p>
                          아쉽게도 당신에게 어울리는
                          {width > 768 ? ` ` : <br />}
                          키보드를 찾지 못했습니다.
                        </p>
                        <p>하지만 실망하지 마세요!</p>
                        <p>
                          Keyplus에서 많은 키보드를 직접 둘러 보실 수 있습니다.
                        </p>
                        <button
                          className="survey-start-button"
                          onClick={onClickStartBtn}
                        >
                          더 많은 키보드 구경하러 가기
                        </button>
                      </>
                    )}
                  </div>
                )}
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
