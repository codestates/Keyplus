import React, { useState } from 'react';
import useWidthSize from '../../hooks/useWidthSize';
import { FiPlayCircle } from 'react-icons/fi';

import '../styles/QuestionCard.scss';

const Question1 = ({ onClickSound, audio1, audio2, audio3, audio4 }) => {
  const width = useWidthSize(768);

  const [audioOne, setAudioOne] = useState(false);

  const audio = (num) => {
    if (audioOne) {
      if (num === 1) {
        audio1.play();
      } else if (num === 2) {
        audio2.play();
      } else if (num === 3) {
        audio3.play();
      } else if (num === 4) {
        audio4.play();
      }
    } else if (!audioOne) {
      if (num === 1) {
        audio1.pause();
      } else if (num === 2) {
        audio2.pause();
      } else if (num === 3) {
        audio3.pause();
      } else if (num === 4) {
        audio4.pause();
      }
    }
  };
  console.log(audioOne);

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
            버튼 클릭 시 소리가 재생됩니다.
          </div>
        )}
      </div>
      <div className="card-container question1">
        <div className="card">
          <div className="image-wrapper">
            <img
              src="/soup.png"
              onClick={() => onClickSound(1)}
              onMouseEnter={() => {
                setAudioOne(false);
                audio(1);
              }}
              onMouseLeave={() => {
                setAudioOne(true);
                audio(1);
              }}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">찌개 끓는 소리</div>
            <div className="title">
              보글보글
              <div
                className="mp3-icon"
                onClick={() => {
                  setAudioOne((audioOne) => !audioOne);
                  audio(1);
                }}
              >
                {width <= 768 && <FiPlayCircle />}
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="image-wrapper">
            <img
              src="/chocolate.png"
              onClick={() => onClickSound(2)}
              onMouseEnter={() => {
                setAudioOne(false);
                audio(2);
              }}
              onMouseLeave={() => {
                setAudioOne(true);
                audio(2);
              }}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">초콜릿 부러뜨리는 소리</div>
            <div className="title">
              도각도각
              <div
                className="mp3-icon"
                onClick={() => {
                  setAudioOne((audioOne) => !audioOne);
                  audio(2);
                }}
              >
                {width <= 768 && <FiPlayCircle />}
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="image-wrapper">
            <img
              src="/pen.png"
              onClick={() => onClickSound(3)}
              onMouseEnter={() => {
                setAudioOne(false);
                audio(3);
              }}
              onMouseLeave={() => {
                setAudioOne(true);
                audio(3);
              }}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">만년필로 글씨 쓰는 소리</div>
            <div className="title">
              서걱서걱
              <div
                className="mp3-icon"
                onClick={() => {
                  setAudioOne((audioOne) => !audioOne);
                  audio(3);
                }}
              >
                {width <= 768 && <FiPlayCircle />}
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="image-wrapper">
            <img
              src="/gaming.png"
              onClick={() => onClickSound(4)}
              onMouseEnter={() => {
                setAudioOne(false);
                audio(4);
              }}
              onMouseLeave={() => {
                setAudioOne(true);
                audio(4);
              }}
            />
          </div>
          <div className="text-wrapper">
            <div className="description">PC방 키보드 소리</div>
            <div className="title">
              찰칵찰칵
              <div
                className="mp3-icon"
                onClick={() => {
                  setAudioOne((audioOne) => !audioOne);
                  audio(4);
                }}
              >
                {width <= 768 && <FiPlayCircle />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question1;
