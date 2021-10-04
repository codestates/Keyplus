import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import exceptionAxios from 'axios';

import useWidthSize from '../hooks/useWidthSize';
import useIsMount from '../hooks/useIsMount';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Question1 from '../components/Survey/Question1';
import Question2 from '../components/Survey/Question2';
import Question3 from '../components/Survey/Question3';
import Question4 from '../components/Survey/Question4';
import Question5 from '../components/Survey/Question5';
import Question6 from '../components/Survey/Question6';
import KakaoShareButton from '../components/KakaoShareButton';
import KeyboardCard from './KeyboardCard';

import './styles/Survey.scss';

import { message, Spin } from 'antd';
import { RiEmotionSadLine } from 'react-icons/ri';

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('2초가 지났습니다!');
    }, 2000);
  });
};

const Survey = () => {
  const history = useHistory();

  const width = useWidthSize(768);
  const isMount = useIsMount();

  const urlSearchParams = useRef(new URLSearchParams(window.location.search));
  const userNickname =
    urlSearchParams.current.get('nickname') ??
    useSelector((state) => state.user?.nickname);

  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboards, setKeyboards] = useState(null);

  const [sound, setSound] = useState(
    urlSearchParams.current.get('sound')
      ? Number(urlSearchParams.current.get('sound'))
      : null
  );
  const [color, setColor] = useState(
    urlSearchParams.current.get('sound')
      ? Number(urlSearchParams.current.get('color'))
      : null
  );
  const [backlight, setBacklight] = useState(
    urlSearchParams.current.get('sound')
      ? Number(urlSearchParams.current.get('backlight'))
      : null
  );
  const [tenkey, setTenkey] = useState(
    urlSearchParams.current.get('sound')
      ? Number(urlSearchParams.current.get('tenkey'))
      : null
  );
  const [bluetooth, setBluetooth] = useState(
    urlSearchParams.current.get('sound')
      ? Number(urlSearchParams.current.get('bluetooth'))
      : null
  );
  const [price, setPrice] = useState(
    urlSearchParams.current.get('sound')
      ? Number(urlSearchParams.current.get('price'))
      : null
  );

  const [audio1, setAudio1] = useState(new Audio('/boggle.mp3'));
  const [audio2, setAudio2] = useState(new Audio('/nonclick.mp3'));
  const [audio3, setAudio3] = useState(new Audio('/linear.mp3'));
  const [audio4, setAudio4] = useState(new Audio('/click.mp3'));

  //! useEffect
  useEffect(() => {
    console.log('Survey 컴포넌트가 화면에 나타남');
    console.log('started', isStarted);
    return () => {
      console.log('Survey 컴포넌트가 화면에서 사라짐');
      console.log('started', isStarted);
    };
  }, []);

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
      console.log('Audio를 꺼라.');
    };
  }, [audio1, audio2, audio3, audio4]);

  const mountedSound = useRef(false);
  useEffect(() => {
    if (!mountedSound.current) {
      mountedSound.current = true;

      if (sound) {
        setIsStarted(true);
        console.log('여긴 sound 설정, 94');
      }
      return;
    }
    return () => {
      console.log('여긴 sound 반응, 97');
      console.log(sound);
      console.log('started', isStarted);
    };
  }, [sound]);

  const mountedPrice = useRef(false);
  useEffect(async () => {
    if (!mountedPrice.current) {
      mountedPrice.current = true;

      if (price) {
        try {
          console.log('axios 통신을 합니다.');
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

          if (isMount.current) {
            setKeyboards(filteredKeyboards);
            setIsLoading(false);
          }
        } catch (err) {
          console.log(err);
          if (isMount.current) {
            setIsLoading(false);
          }
        }
      }
      return;
    } else {
      try {
        console.log('axios 통신을 합니다.');
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
        if (isMount.current) {
          setKeyboards(filteredKeyboards);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        if (isMount.current) {
          setIsLoading(false);
        }
      }
    }
    console.log('일단 여기 반응?');
    return () => {
      console.log('여긴 price 반응, 262');
    };
  }, [price, isMount]);

  const onClickStartBtn = useCallback(() => {
    setIsStarted(true);
  }, []);

  // const mountedAudio = useRef(false);
  // useEffect(() => {
  //   if (!mountedAudio.current) {
  //     mountedAudio.current = true;
  //     return;
  //   } else {
  //     return () => {
  //       console.log('여긴 audio1,2,3,4 반응, 100');
  //       console.log(audio1, audio2, audio3, audio4);

  //       audio1.pause();
  //       audio1.currentTime = 0;
  //       audio2.pause();
  //       audio2.currentTime = 0;
  //       audio3.pause();
  //       audio3.currentTime = 0;
  //       audio4.pause();
  //       audio4.currentTime = 0;
  //     };
  //   }
  // }, [audio1, audio2, audio3, audio4]);

  const onClickSound = useCallback((res) => {
    setSound(res);

    audio1.pause();
    audio1.currentTime = 0;

    audio2.pause();
    audio2.currentTime = 0;

    audio3.pause();
    audio3.currentTime = 0;

    audio4.pause();
    audio4.currentTime = 0;
  }, []);

  const convertSoundToText = useCallback((sound) => {
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
  }, []);

  const onClickColor = useCallback((res) => {
    setColor(res);
  }, []);

  const convertColorToText = useCallback((color) => {
    if (color === 1) {
      return '유채색의, ';
    } else if (color === 2) {
      return '모든 색의, ';
    }
    return '무채색의, ';
  }, []);

  const onClickBacklight = useCallback((res) => {
    setBacklight(res);
  }, []);

  const convertBacklightToText = useCallback((backlight) => {
    if (backlight === 1) {
      return '백라이트가 있는, ';
    } // 2
    return '백라이트가 상관없는, ';
  }, []);

  const onClickTenkey = useCallback((res) => {
    setTenkey(res);
  }, []);

  const convertTenkeyToText = useCallback((tenkey) => {
    if (tenkey === 1) {
      return '텐키가 있는, ';
    } else if (tenkey === 2) {
      return '텐키가 상관없는, ';
    }
    return '텐키가 없는, ';
  }, []);

  const onClickBluetooth = useCallback((res) => {
    setBluetooth(res);
  }, []);

  const convertBluetoothToText = useCallback((blutetooth) => {
    if (blutetooth === 1) {
      return '블루투스를 지원하는, ';
    } // 2
    return '블루투스가 상관없는, ';
  }, []);

  const onClickPrice = useCallback((res) => {
    setPrice(res);
  }, []);

  const convertPriceToText = useCallback((price) => {
    switch (price) {
      case 50000:
        return '5만원 이하';

      case 100000:
        return '10만원 이하';

      case 150000:
        return '15만원 이하';

      case 200000:
        return '20만원 이하';

      case 300000:
        return '30만원 이하';

      default:
        return '가격대가 상관없는';
    }
  }, []);

  const onCopy = useCallback(() => {
    message.success('링크 복사 완료');
  }, []);

  // const onClickShareBtn = () => {
  //   message.info('기능 준비 중입니다.');
  // };

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
    } else if (price) {
      return (
        <>
          <Header />
          {isLoading ? (
            <main className="survey loading">
              <div className="survey-loading-area">
                <span className="survey-loading-text">취향 분석 중</span>
                <Spin size="small" style={{ color: '#000' }} />
              </div>
            </main>
          ) : (
            <main className="survey finish">
              {keyboards && (
                <div className="survey-result-main">
                  <p className="survey-result-header">
                    <span>{userNickname ? userNickname : '비회원'}님은</span>
                    <br />
                    <span className="survey-result-strong">{`${convertSoundToText(
                      sound
                    )}`}</span>
                    <br />
                    <span className="survey-result-strong">{`${convertColorToText(
                      color
                    )}`}</span>
                    <span className="survey-result-strong">{`${convertBacklightToText(
                      backlight
                    )}`}</span>
                    {width > 768 ? ` ` : <br />}
                    <span className="survey-result-strong">
                      {`${convertTenkeyToText(tenkey)} ${convertBluetoothToText(
                        bluetooth
                      )}`}
                    </span>
                    <br />
                    <span className="survey-result-strong">
                      {`${convertPriceToText(price)}`}
                    </span>{' '}
                    <span>키보드 취향을 가지셨네요.</span>
                  </p>
                  {keyboards.length !== 0 ? (
                    <>
                      <p>
                        {userNickname ? userNickname : '비회원'}님에게 딱 맞는
                        {width > 768 ? ` ` : <br />}
                        <span className="survey-result-strong">
                          {keyboards.length}개
                        </span>
                        의 키보드를 찾았습니다!
                      </p>

                      <div className="share-area">
                        <KakaoShareButton
                          url={`https://keyplus.kr/survey?nickname=${
                            userNickname ? userNickname : '비회원'
                          }&sound=${sound}&color=${color}&backlight=${backlight}&tenkey=${tenkey}&bluetooth=${bluetooth}&price=${price}`}
                        />
                      </div>

                      <div className="link-area">
                        <CopyToClipboard
                          onCopy={onCopy}
                          text={`https://keyplus.kr/survey?nickname=${
                            userNickname ? userNickname : '비회원'
                          }&sound=${sound}&color=${color}&backlight=${backlight}&tenkey=${tenkey}&bluetooth=${bluetooth}&price=${price}`}
                        >
                          <button>링크 복사</button>
                        </CopyToClipboard>
                      </div>

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
                      <p className="survey-result-italic">
                        아쉽게도 {userNickname ? userNickname : '비회원'}
                        님에게 어울리는
                        {width > 768 ? ` ` : <br />}
                        키보드를 찾지 못했습니다.{' '}
                        <RiEmotionSadLine style={{ fontSize: '20px' }} />
                      </p>
                      <p className="survey-result-worry">
                        하지만 실망하지 마세요!
                      </p>
                      <p className="survey-result-inspire">
                        <span className="survey-result-strong">Keyplus</span>
                        에서 많은 키보드를{width > 768 ? ` ` : <br />}
                        직접 둘러 보실 수 있습니다.
                      </p>
                      <button
                        className="survey-result-button"
                        onClick={() => history.push('/keyboards')}
                      >
                        더 많은 키보드 구경하러 가기
                      </button>
                    </>
                  )}
                </div>
              )}
            </main>
          )}

          {/* <Footer /> */}
        </>
      );
    } else {
      return (
        <>
          <Header />
          <main className="survey start">
            <div className="survey-start-main"></div>
          </main>
        </>
      );
    }
  }
};

export default Survey;
