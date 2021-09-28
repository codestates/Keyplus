import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/customAxios';
import { isError } from '../reducers/errorReducer';

import {
  HeartOutlined,
  HeartFilled,
  BulbFilled,
  BulbOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { FaBluetooth } from 'react-icons/fa';
import {
  IoColorFillOutline,
  IoColorFill,
  IoKeypad,
  IoKeypadOutline,
} from 'react-icons/io5';
import { BiWon } from 'react-icons/bi';
import { FcIdea, FcNoIdea } from 'react-icons/fc';
import { AiFillBulb, AiOutlineBulb } from 'react-icons/ai';

import './styles/KeyboardCard.scss';
import { Link } from 'react-router-dom';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';

import { Card, Avatar, message } from 'antd';

const { Meta } = Card;

const keySwitchComponent = {
  저소음적축: (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#ff656c',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>저적</span>
    </div>
  ),
  적축: (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#ff1A48',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>적축</span>
    </div>
  ),
  청축: (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#00b4f9',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>청축</span>
    </div>
  ),
  갈축: (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#B8792A',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>갈축</span>
    </div>
  ),
  흑축: (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#0d0d0d',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '12px' }}>흑축</span>
    </div>
  ),
};
// #ff656c
// #ff1A48
// #0d0d0d
// #B8792A
// #00b4f9

const KeyboardCard = memo(({ keyboard }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const likes = useSelector((state) => state.likes);

  // ! 내가 이미 좋아요를 누른 상태였으면 liked가 true여야 함
  // ! 내 redux의 likes 리스트에 이 keyboard가 있어? 그럼 true야 / 근데 없어?(혹은 로그아웃이라 likes가 []) 그럼 false야)
  const checkLiked = (id) => likes.findIndex((like) => like.id == id) !== -1;

  const [liked, setLiked] = useState(checkLiked(keyboard.id));
  const [likeCount, setLikeCount] = useState(keyboard.likeCount);

  const onClickHeart = useCallback(async () => {
    // 만약 지금 liked: true => deleteLike 요청
    // 만약 지금 liked: false => addLike 요청

    if (!user) {
      return message.warning('로그인을 먼저 해주세요.');
    }

    try {
      // ! Add a Like에서 바뀐 키보드 정보를 보내줄 필요 없음 ?
      if (liked) {
        await dispatch(deleteLikes(keyboard.id)).unwrap();
        setLikeCount((prevLikeCount) => prevLikeCount - 1);
      } else {
        await dispatch(addLikes(keyboard.id)).unwrap();
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
      }
      setLiked((prevLiked) => !prevLiked);
    } catch (err) {
      dispatch(isError(err.response));
    }
  }, [user, keyboard, liked]);

  return (
    <Card
      style={{ width: '100%' }}
      cover={
        <>
          {keyboard && (
            <Link
              to={`/keyboards/${keyboard.id}`}
              style={{
                width: '100%',
              }}
            >
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
                <div
                  className="hover-overlay"
                  style={{
                    width: '100%',
                    height: '200px',
                  }}
                >
                  <p>상세 정보</p>
                </div>
              </div>
            </Link>
          )}
        </>
      }
      // actions={[
      //   <>
      //     {liked ? (
      //       <HeartFilled
      //         style={{ display: 'inline', color: '#ff0000' }}
      //         onClick={onClickHeart}
      //       />
      //     ) : (
      //       <HeartOutlined
      //         style={{ display: 'inline', color: '#ff0000' }}
      //         onClick={onClickHeart}
      //       />
      //     )}
      //     {likeCount}
      //   </>,
      //   <EditOutlined key="edit" />,
      //   <>
      //     {keyboard && (
      //       <Link to={`/keyboards/${keyboard.id}`}>
      //         <SettingOutlined key="setting" />
      //       </Link>
      //     )}
      //   </>,
      // ]}
    >
      <Meta
        // avatar={
        //   <Avatar
        //     src={process.env.PUBLIC_URL + `/${keyboard.brand}.png`}
        //     style={{
        //       width: '100px',
        //       height: '24px',
        //       borderRadius: '0px',
        //     }}
        //   />
        // }
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
            }}
          >
            <span>{`${keyboard.brand} ${keyboard.name}`}</span>

            <div>
              {liked ? (
                <HeartFilled
                  style={{
                    display: 'inline',
                    color: '#ff0000',
                    marginRight: '3px',
                  }}
                  onClick={onClickHeart}
                />
              ) : (
                <HeartOutlined
                  style={{
                    display: 'inline',
                    color: '#ff0000',
                    marginRight: '3px',
                  }}
                  onClick={onClickHeart}
                />
              )}
              {likeCount}
            </div>
          </div>
        }
        description={Object.keys(keyboard.switch).map((keySwitch, idx) => (
          <span key={`${keySwitch}_${idx}`}>
            {keyboard.switch[keySwitch] && <>{keySwitchComponent[keySwitch]}</>}
          </span>
        ))}
      />
      <div style={{ height: '10px' }}></div>

      {/* <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#7a6ded" offset="0%" />
          <stop stopColor="#591885" offset="100%" />
        </linearGradient>
      </svg> */}

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
  );
});

export default KeyboardCard;
