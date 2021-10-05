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
import { logOutForce } from '../reducers/userSlice';
import { logOutMyLikes } from '../reducers/likesSlice';
import { logOutMyReviews } from '../reducers/reviewsSlice';
import { setExpireDate } from '../reducers/expireDateReducer';
const { Meta } = Card;

export const keySwitchComponent = {
  저소음적축: (
    <span style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#ff656c',
          marginRight: '1px',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>저적</span>
    </span>
  ),
  적축: (
    <span style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#ff1A48',
          marginRight: '1px',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>적축</span>
    </span>
  ),
  청축: (
    <span style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#00b4f9',
          marginRight: '1px',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>청축</span>
    </span>
  ),
  갈축: (
    <span style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#B8792A',
          marginRight: '1px',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>갈축</span>
    </span>
  ),
  흑축: (
    <span style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#0d0d0d',
          marginRight: '1px',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>흑축</span>
    </span>
  ),
};

const KeyboardCard = memo(({ keyboard }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const likes = useSelector((state) => state.likes);
  const checkLiked = (id) => likes.findIndex((like) => like.id == id) !== -1;
  const [liked, setLiked] = useState(checkLiked(keyboard.id));
  const [likeCount, setLikeCount] = useState(keyboard.likeCount);

  const onClickHeart = useCallback(
    async (e) => {
      e.preventDefault();
      if (!user) {
        return message.warning('로그인을 먼저 해주세요.');
      }
      try {
        if (liked) {
          await dispatch(deleteLikes(keyboard.id)).unwrap();
          setLikeCount((prevLikeCount) => prevLikeCount - 1);
        } else {
          await dispatch(addLikes(keyboard.id)).unwrap();
          setLikeCount((prevLikeCount) => prevLikeCount + 1);
        }
        setLiked((prevLiked) => !prevLiked);
      } catch (err) {
        return message.warning('오류가 발생하여 로그아웃됩니다.');
      }
    },
    [user, keyboard, liked]
  );

  return (
    <Link
      to={`/keyboards/${keyboard.id}`}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Card
        className="keyboard-card"
        cover={
          <>
            {keyboard && (
              <div className="keyboard-img">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/${keyboard.image1}`}
                  alt={keyboard.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTop: '1px solid rgb(240,240,240) ',
                    borderRight: '1px solid rgb(240,240,240) ',
                    borderLeft: '1px solid rgb(240,240,240) ',
                  }}
                />
              </div>
            )}
          </>
        }
      >
        <Meta
          title={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '14px',
              }}
            >
              <span>{`${keyboard.brand} ${keyboard.name}`}</span>
              <div style={{ cursor: 'pointer' }} onClick={onClickHeart}>
                {liked ? (
                  <HeartFilled
                    style={{
                      display: 'inline',
                      color: '#ff0000',
                      marginRight: '3px',
                    }}
                  />
                ) : (
                  <HeartOutlined
                    style={{
                      display: 'inline',
                      color: '#ff0000',
                      marginRight: '3px',
                    }}
                  />
                )}
                {likeCount}
              </div>
            </div>
          }
          description={Object.keys(keyboard.switch).map(
            (keySwitch, idx) =>
              keyboard.switch[keySwitch] && (
                <span key={`${keySwitch}_${idx}`}>
                  <>{keySwitchComponent[keySwitch]}</>
                </span>
              )
          )}
        />
        <div style={{ height: '10px' }}></div>

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
            {/* <stop stopColor="rgba(186, 12, 248, 1)" offset="85%" /> */}
            <stop stopColor="rgba(251, 7, 217, 1)" offset="85%" />
            <stop stopColor="rgba(255, 0, 0, 1)" offset="100%" />
          </linearGradient>
        </svg>
        <svg width="1em" height="1em">
          <linearGradient id="bulb-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop stopColor="#f7f760" offset="0%" />
            <stop stopColor="#ffff80" offset="90%" />
            <stop stopColor="rgba(0,0,0, 1)" offset="100%" />
          </linearGradient>
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', columnGap: '5px' }}>
            {keyboard.color ? (
              <IoColorFill style={{ fill: 'url(#rainbow-gradient)' }} />
            ) : (
              <IoColorFillOutline />
            )}

            {keyboard.backlight ? (
              <AiFillBulb style={{ fill: 'url(#bulb-gradient)' }} />
            ) : (
              <AiOutlineBulb />
            )}
            {keyboard.tenkey ? (
              <IoKeypad style={{ fill: 'red' }} />
            ) : (
              <IoKeypadOutline />
            )}

            {keyboard.bluetooth ? (
              <FaBluetooth style={{ fill: '#2084ce' }} />
            ) : (
              <FaBluetooth />
            )}
          </div>
          <div style={{ fontSize: '12px' }}>
            <BiWon />
            <span>{`${keyboard.price.toLocaleString()}`}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
});

export default KeyboardCard;
