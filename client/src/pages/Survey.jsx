import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import exceptionAxios from 'axios';
import Header from '../components/Header';
import Question1 from '../components/Survey/Question1';
import Question2 from '../components/Survey/Question2';
import Question3 from '../components/Survey/Question3';
import Question4 from '../components/Survey/Question4';
import Question5 from '../components/Survey/Question5';
import Question6 from '../components/Survey/Question6';
import KakaoShareButton from '../components/KakaoShareButton';
import KeyboardCard from '../components/KeyboardCard';
import { message, Spin } from 'antd';
import { RiEmotionSadLine } from 'react-icons/ri';
import './styles/Survey.scss';
import { unstable_batchedUpdates } from 'react-dom';

//! 취향분석 중 강제 로딩
const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

const Survey = ({ history, location }) => {
  const width = useSelector((state) => state.window.width);

  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboards, setKeyboards] = useState(null);

  const urlSearchParams = useRef(new URLSearchParams(location.search));
  const userNickname = useRef(
    urlSearchParams.current.get('nickname') ??
      useSelector((state) => state.user?.nickname)
  );
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

  const [audios] = useState([
    new Audio('/audio/boggle.mp3'),
    new Audio('/audio/nonclick.mp3'),
    new Audio('/audio/linear.mp3'),
    new Audio('/audio/click.mp3'),
  ]);

  useEffect(() => {
    return () => {
      audios.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const mountedSound = useRef(false);
  useEffect(() => {
    if (!mountedSound.current) {
      mountedSound.current = true;
      if (sound) {
        setIsStarted(true);
      }
    }
  }, [sound]);

  const mountedPrice = useRef(false);
  useEffect(() => {
    let isFetched = true;

    const fetchData = async () => {
      if (!mountedPrice.current) {
        mountedPrice.current = true;
        if (price) {
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
            if (isFetched) {
              setKeyboards(filteredKeyboards);
              setIsLoading(false);
            }
          } catch (err) {
            if (isFetched) {
              setIsLoading(false);
            }
          }
        }
        return;
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
          if (isFetched) {
            unstable_batchedUpdates(() => {
              setKeyboards(filteredKeyboards);
              setIsLoading(false);
            });
          }
        } catch (err) {
          if (isFetched) {
            setIsLoading(false);
          }
        }
      }
    };
    fetchData();

    return () => {
      isFetched = false;
    };
  }, [price]);

  const onClickStartBtn = useCallback(() => {
    setIsStarted(true);
  }, []);

  const onClickSound = useCallback((res) => {
    setSound(res);
    audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
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
    }
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
    }
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

  if (!isStarted) {
    return (
      <>
        <Header />
        <main
          className="survey start"
          style={{
            backgroundImage: "url('/survey/survey-background.png')",
          }}
        >
          <div className="survey-start-main">
            <h2>
              맘에 쏙 드는 기계식 키보드
              {width >= 768 ? `, ` : <br />}
              찾기 어려우셨나요?
              <br />
              {width >= 768 ? null : <br />}
              쉽고 간단한 테스트로
              {width >= 768 ? ` ` : <br />}
              나에게 맞는 키보드를 알아보세요.
            </h2>
            <button className="survey-start-button" onClick={onClickStartBtn}>
              START
            </button>
          </div>
        </main>
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
            <Question1 onClickSound={onClickSound} audios={audios} />
          </main>
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
                    <span>
                      {userNickname.current ? userNickname.current : '비회원'}
                      님은
                    </span>
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
                    {width >= 768 ? ` ` : <br />}
                    <span className="survey-result-strong">
                      {`${convertTenkeyToText(tenkey)} ${convertBluetoothToText(
                        bluetooth
                      )}`}
                    </span>
                    <br />
                    <span className="survey-result-strong">
                      {`${convertPriceToText(price)}`}
                    </span>
                    <span>키보드 취향을 가지셨네요.</span>
                  </p>
                  {keyboards.length !== 0 ? (
                    <>
                      <p>
                        {userNickname.current ? userNickname.current : '비회원'}
                        님에게 딱 맞는
                        {width >= 768 ? ` ` : <br />}
                        <span className="survey-result-strong">
                          {keyboards.length}개
                        </span>
                        의 키보드를 찾았습니다!
                      </p>
                      <div className="share-area">
                        <KakaoShareButton
                          url={`https://keyplus.kr/survey?nickname=${
                            userNickname.current
                              ? userNickname.current
                              : '비회원'
                          }&sound=${sound}&color=${color}&backlight=${backlight}&tenkey=${tenkey}&bluetooth=${bluetooth}&price=${price}`}
                        />
                      </div>
                      <div className="link-area">
                        <CopyToClipboard
                          onCopy={onCopy}
                          text={`https://keyplus.kr/survey?nickname=${
                            userNickname.current
                              ? userNickname.current
                              : '비회원'
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
                        아쉽게도
                        {userNickname.current ? userNickname.current : '비회원'}
                        님에게 어울리는
                        {width >= 768 ? ` ` : <br />}
                        키보드를 찾지 못했습니다.
                        <RiEmotionSadLine style={{ fontSize: '20px' }} />
                      </p>
                      <p className="survey-result-worry">
                        하지만 실망하지 마세요!
                      </p>
                      <p className="survey-result-inspire">
                        <span className="survey-result-strong">Keyplus</span>
                        에서 많은 키보드를{width >= 768 ? ` ` : <br />}
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
