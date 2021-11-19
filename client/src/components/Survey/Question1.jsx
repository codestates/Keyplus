import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiPlayCircle, FiStopCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import '../styles/Question.scss';

const Question1 = ({ onClickSound, audios }) => {
  const width = useSelector((state) => state.window.width);
  const [playingAudios, setPlayingsAudios] = useState(Array(4).fill(false));

  const playAudios = useCallback((number) => {
    setPlayingsAudios((playingAudios) => {
      return playingAudios.map((_, index) => {
        if (index === number - 1) {
          audios[index].play();
          return true;
        } else {
          audios[index].pause();
          audios[index].currentTime = 0;
          return false;
        }
      });
    });
  }, []);

  const pauseAudios = useCallback((number) => {
    audios[number - 1].pause();
    audios[number - 1].currentTime = 0;
    setPlayingsAudios(Array(4).fill(false));
  }, []);

  return (
    <>
      <div className="question-header">
        <h2 className="question-title">
          <div>가장 마음에 드는 소리를 알려주세요.</div>
        </h2>
        {width >= 768 ? (
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
              onMouseEnter={() => playAudios(1)}
              onMouseLeave={() => pauseAudios(1)}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">찌개 끓는 소리</div>
            <div className="title">
              보글보글
              {width <= 768 && (
                <div className="mp3-icon">
                  {playingAudios[0] ? (
                    <FiStopCircle onClick={() => pauseAudios(1)} />
                  ) : (
                    <FiPlayCircle onClick={() => playAudios(1)} />
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
              onMouseEnter={() => playAudios(2)}
              onMouseLeave={() => pauseAudios(2)}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">초콜릿 부러뜨리는 소리</div>
            <div className="title">
              도각도각
              {width <= 768 && (
                <div className="mp3-icon">
                  {playingAudios[1] ? (
                    <FiStopCircle onClick={() => pauseAudios(2)} />
                  ) : (
                    <FiPlayCircle onClick={() => playAudios(2)} />
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
              onMouseEnter={() => playAudios(3)}
              onMouseLeave={() => pauseAudios(3)}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">만년필로 글씨 쓰는 소리</div>
            <div className="title">
              서걱서걱
              {width <= 768 && (
                <div className="mp3-icon">
                  {playingAudios[2] ? (
                    <FiStopCircle onClick={() => pauseAudios(3)} />
                  ) : (
                    <FiPlayCircle onClick={() => playAudios(3)} />
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
              onMouseEnter={() => playAudios(4)}
              onMouseLeave={() => pauseAudios(4)}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">PC방 키보드 소리</div>
            <div className="title">
              찰칵찰칵
              {width <= 768 && (
                <div className="mp3-icon">
                  {playingAudios[3] ? (
                    <FiStopCircle onClick={() => pauseAudios(4)} />
                  ) : (
                    <FiPlayCircle onClick={() => playAudios(4)} />
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
