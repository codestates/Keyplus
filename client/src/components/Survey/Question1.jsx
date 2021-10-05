import React, { useEffect, useRef, useState } from 'react';
import useWidthSize from '../../hooks/useWidthSize';
import { FiPlayCircle, FiStopCircle } from 'react-icons/fi';

import '../styles/Question.scss';

const Question1 = ({ onClickSound, audio1, audio2, audio3, audio4 }) => {
  const width = useWidthSize(768);
  const [audioPlaying1, setAudioPlaying1] = useState(false);
  const [audioPlaying2, setAudioPlaying2] = useState(false);
  const [audioPlaying3, setAudioPlaying3] = useState(false);
  const [audioPlaying4, setAudioPlaying4] = useState(false);
  const mounted1 = useRef(false);

  useEffect(() => {
    if (!mounted1.current) {
      mounted1.current = true;
    } else {
      if (audioPlaying1) {
        audio1.play();
        audio2.pause();
        audio2.currentTime = 0;
        audio3.pause();
        audio3.currentTime = 0;
        audio4.pause();
        audio4.currentTime = 0;
        setAudioPlaying1(true);
        setAudioPlaying2(false);
        setAudioPlaying3(false);
        setAudioPlaying4(false);
      } else {
        audio1.pause();
        audio1.currentTime = 0;
        setAudioPlaying1(false);
      }
    }
  }, [audioPlaying1]);

  const mounted2 = useRef(false);
  useEffect(() => {
    if (!mounted2.current) {
      mounted2.current = true;
    } else {
      if (audioPlaying2) {
        audio1.pause();
        audio1.currentTime = 0;
        audio2.play();
        audio3.pause();
        audio3.currentTime = 0;
        audio4.pause();
        audio4.currentTime = 0;
        setAudioPlaying1(false);
        setAudioPlaying2(true);
        setAudioPlaying3(false);
        setAudioPlaying4(false);
      } else {
        audio2.pause();
        audio2.currentTime = 0;
        setAudioPlaying2(false);
      }
    }
  }, [audioPlaying2]);

  const mounted3 = useRef(false);
  useEffect(() => {
    if (!mounted3.current) {
      mounted3.current = true;
    } else {
      if (audioPlaying3) {
        audio1.pause();
        audio1.currentTime = 0;
        audio2.pause();
        audio2.currentTime = 0;
        audio3.play();
        audio4.pause();
        audio4.currentTime = 0;
        setAudioPlaying1(false);
        setAudioPlaying2(false);
        setAudioPlaying3(true);
        setAudioPlaying4(false);
      } else {
        audio3.pause();
        audio3.currentTime = 0;
        setAudioPlaying3(false);
      }
    }
  }, [audioPlaying3]);

  const mounted4 = useRef(false);
  useEffect(() => {
    if (!mounted4.current) {
      mounted4.current = true;
    } else {
      if (audioPlaying4) {
        audio1.pause();
        audio1.currentTime = 0;
        audio2.pause();
        audio2.currentTime = 0;
        audio3.pause();
        audio3.currentTime = 0;
        audio4.play();
        setAudioPlaying1(false);
        setAudioPlaying2(false);
        setAudioPlaying3(false);
        setAudioPlaying4(true);
      } else {
        audio4.pause();
        audio4.currentTime = 0;
        setAudioPlaying4(false);
      }
    }
  }, [audioPlaying4]);

  return (
    <>
      <div className="question-header">
        <h2 className="question-title">
          <div>가장 마음에 드는 소리를 알려주세요.</div>
        </h2>
        {width > 768 ? (
          <div className="question-description">
            이미지에 마우스를 올리면 소리가 재생됩니다.
          </div>
        ) : (
          <div className="question-description">
            재생 버튼을 누르면 소리가 재생됩니다.
          </div>
        )}
      </div>
      <div className="card-container question1">
        <div className="card">
          <div className="image-wrapper">
            <img
              src="/survey/soup.png"
              onClick={() => onClickSound(1)}
              onMouseEnter={() => {
                setAudioPlaying1(true);
              }}
              onMouseLeave={() => {
                setAudioPlaying1(false);
              }}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">찌개 끓는 소리</div>
            <div className="title">
              보글보글
              {width <= 768 && (
                <div className="mp3-icon">
                  {audioPlaying1 ? (
                    <FiStopCircle onClick={() => setAudioPlaying1(false)} />
                  ) : (
                    <FiPlayCircle onClick={() => setAudioPlaying1(true)} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="image-wrapper">
            <img
              src="/survey/chocolate.png"
              onClick={() => onClickSound(2)}
              onMouseEnter={() => {
                setAudioPlaying2(true);
              }}
              onMouseLeave={() => {
                setAudioPlaying2(false);
              }}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">초콜릿 부러뜨리는 소리</div>
            <div className="title">
              도각도각
              {width <= 768 && (
                <div className="mp3-icon">
                  {audioPlaying2 ? (
                    <FiStopCircle onClick={() => setAudioPlaying2(false)} />
                  ) : (
                    <FiPlayCircle onClick={() => setAudioPlaying2(true)} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="image-wrapper">
            <img
              src="/survey/pen.png"
              onClick={() => onClickSound(3)}
              onMouseEnter={() => {
                setAudioPlaying3(true);
              }}
              onMouseLeave={() => {
                setAudioPlaying3(false);
              }}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">만년필로 글씨 쓰는 소리</div>
            <div className="title">
              서걱서걱
              {width <= 768 && (
                <div className="mp3-icon">
                  {audioPlaying3 ? (
                    <FiStopCircle onClick={() => setAudioPlaying3(false)} />
                  ) : (
                    <FiPlayCircle onClick={() => setAudioPlaying3(true)} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="image-wrapper">
            <img
              src="/survey/gaming.png"
              onClick={() => onClickSound(4)}
              onMouseEnter={() => {
                setAudioPlaying4(true);
              }}
              onMouseLeave={() => {
                setAudioPlaying4(false);
              }}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">PC방 키보드 소리</div>
            <div className="title">
              찰칵찰칵
              {width <= 768 && (
                <div className="mp3-icon">
                  {audioPlaying4 ? (
                    <FiStopCircle onClick={() => setAudioPlaying4(false)} />
                  ) : (
                    <FiPlayCircle onClick={() => setAudioPlaying4(true)} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question1;
