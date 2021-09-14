import React, { useEffect, useRef, useState } from 'react';
import Question1 from '../components/Questions/Question1';
import Question2 from '../components/Questions/Question2';
import Question3 from '../components/Questions/Question3';
import Question4 from '../components/Questions/Question4';

const Survey = () => {
  //TODO: API 하나 더 만들어달라고 요청해야함
  //FIXME: 게이밍, 노이즈, 사운드 등등 useState로 만듬
  //클릭핸들러 함수

  const [isLoading, setIsLoading] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [gaming, setGaming] = useState(null);
  const [noise, setNoise] = useState(null);
  const [weight, setWeight] = useState(null);
  const [sound, setSound] = useState(null);

  const onClickStartBtn = () => {
    setIsStarted(true);
  };

  const onClickGaming = (res) => {
    setGaming(res);
  };

  const onClickNoise = (res) => {
    setNoise(res);
  };

  const onClickWeight = (res) => {
    setWeight(res);
  };

  const onClickSound = (res) => {
    setSound(res);
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
  }, [sound]);

  if (!isStarted) {
    return (
      <>
        <button onClick={() => onClickStartBtn()}>START</button>
      </>
    );
  } else {
    if (gaming === null) {
      return (
        <>
          <Question1 onClickGaming={onClickGaming} />
        </>
      );
    } else if (noise === null) {
      return (
        <>
          <Question2 onClickNoise={onClickNoise} />
        </>
      );
    } else if (weight === null) {
      return (
        <>
          <Question3 onClickWeight={onClickWeight} />
        </>
      );
    } else if (sound === null) {
      return (
        <>
          <Question4 onClickSound={onClickSound} />
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
