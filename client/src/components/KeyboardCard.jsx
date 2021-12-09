import React, { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';
import { Card, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { FaBluetooth } from 'react-icons/fa';
import {
  IoColorFillOutline,
  IoColorFill,
  IoKeypad,
  IoKeypadOutline,
} from 'react-icons/io5';
import { BiWon } from 'react-icons/bi';
import { AiFillBulb, AiOutlineBulb } from 'react-icons/ai';

import './styles/KeyboardCard.scss';
const { Meta } = Card;

// ? jsx 그대로 썼던 객체 따로 뺌
import SwitchColor from './SwitchColor';

const fillRainbowGradient = { fill: 'url(#rainbow-gradient)' };
const fillYellowGradient = { fill: 'url(#yellow-gradient)' };
const fillRed = { fill: 'red' };
const fillBlue = { fill: '#2084ce' };

const KeyboardCard = memo(({ keyboard, addLike, deleteLike }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const likes = useSelector((state) => state.likes);
  const checkLiked = (id) => likes.findIndex((like) => like.id == id) !== -1;
  const [liked, setLiked] = useState(checkLiked(keyboard.id));

  const onClickHeart = useCallback(
    async (e) => {
      e.preventDefault();
      if (!user) {
        return message.warning('로그인을 먼저 해주세요.');
      }
      try {
        if (liked) {
          await dispatch(deleteLikes(keyboard.id)).unwrap();
          deleteLike(keyboard.id);
        } else {
          await dispatch(addLikes(keyboard.id)).unwrap();
          addLike(keyboard.id);
        }
        setLiked((prevLiked) => !prevLiked);
      } catch (err) {
        message.warning('오류가 발생하여 로그아웃됩니다.');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    },
    [user, keyboard, liked]
  );

  return (
    <Link to={`/keyboards/${keyboard.id}`} className="keyboard-card-container">
      <Card
        className="keyboard-card"
        cover={
          <>
            {keyboard && (
              <div className="keyboard-img">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/${keyboard.image1}`}
                  alt={keyboard.name}
                />
              </div>
            )}
          </>
        }
      >
        <Meta
          title={
            <div className="keyboard-card-title">
              <span>{`${keyboard.brand} ${keyboard.name}`}</span>
              <div className="keyboard-card-heart" onClick={onClickHeart}>
                {liked ? <HeartFilled /> : <HeartOutlined />}
                {keyboard.likeCount}
              </div>
            </div>
          }
          description={Object.keys(keyboard.switch).map(
            (keySwitch, idx) =>
              keyboard.switch[keySwitch] && (
                <span key={`${keySwitch}_${idx}`}>
                  <SwitchColor keySwitch={keySwitch} />
                </span>
              )
          )}
        />

        <svg width="1em" height="1em">
          <linearGradient id="rainbow-gradient" gradientTransform="rotate(90)">
            <stop stopColor="rgba(255, 0, 0, 1)" offset="0%" />
            <stop stopColor="rgba(255, 154, 0, 1)" offset="20%" />
            <stop stopColor="#ecf842" offset="40%" />
            <stop stopColor="rgba(79, 220, 74, 1)" offset="50%" />
            <stop stopColor="rgba(63, 218, 216, 1)" offset="60%" />
            <stop stopColor="rgba(47, 201, 226, 1)" offset="65%" />
            <stop stopColor="rgba(28, 127, 238, 1)" offset="70%" />
            <stop stopColor="rgba(95, 21, 242, 1)" offset="75%" />
            <stop stopColor="rgba(251, 7, 217, 1)" offset="85%" />
            <stop stopColor="rgba(255, 0, 0, 1)" offset="100%" />
          </linearGradient>
        </svg>
        <svg width="1em" height="1em">
          <linearGradient
            id="yellow-gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop stopColor="#f7f760" offset="0%" />
            <stop stopColor="#ffff80" offset="90%" />
            <stop stopColor="rgba(0,0,0, 1)" offset="100%" />
          </linearGradient>
        </svg>

        <div className="keyboard-card-information">
          <div>
            {keyboard.color ? (
              <IoColorFill style={fillRainbowGradient} />
            ) : (
              <IoColorFillOutline />
            )}

            {keyboard.backlight ? (
              <AiFillBulb style={fillYellowGradient} />
            ) : (
              <AiOutlineBulb />
            )}
            {keyboard.tenkey ? (
              <IoKeypad style={fillRed} />
            ) : (
              <IoKeypadOutline />
            )}

            {keyboard.bluetooth ? (
              <FaBluetooth style={fillBlue} />
            ) : (
              <FaBluetooth />
            )}
          </div>
          <div>
            <BiWon />
            <span>{`${keyboard.price.toLocaleString()}`}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
});

export default KeyboardCard;
