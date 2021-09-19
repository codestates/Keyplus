import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/customAxios';
import { isError } from '../reducers/errorReducer';

import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import './KeyboardCard.scss';
import { Link } from 'react-router-dom';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';

import { Card, Avatar } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const keySwitchComponent = {
  저소음적축: (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#ff656c',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle' }}>저적</span>
    </div>
  ),
  적축: (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#ff1A48',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle' }}>적축</span>
    </div>
  ),
  청축: (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#00b4f9',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle' }}>청축</span>
    </div>
  ),
  갈축: (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#B8792A',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle' }}>갈축</span>
    </div>
  ),
  흑축: (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          verticalAlign: 'middle',
          backgroundColor: '#0d0d0d',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle' }}>흑축</span>
    </div>
  ),
};
// #ff656c
// #ff1A48
// #0d0d0d
// #B8792A
// #00b4f9

const KeyboardCard = ({ keyboard }) => {
  const dispatch = useDispatch();

  const likes = useSelector((state) => state.likes);

  // ! 내가 이미 좋아요를 누른 상태였으면 liked가 true여야 함
  // ! 내 redux의 likes 리스트에 이 keyboard가 있어? 그럼 true야 / 근데 없어?(혹은 로그아웃이라 likes가 []) 그럼 false야)
  const checkLiked = (id) => likes.findIndex((like) => like.id === id) !== -1;

  const [liked, setLiked] = useState(checkLiked(keyboard.id));
  const [likeCount, setLikeCount] = useState(keyboard.likeCount);

  const onClickHeart = async () => {
    // 만약 지금 liked: true => deleteLike 요청
    // 만약 지금 liked: false => addLike 요청

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
  };
  return (
    // <article className="card">
    //   <Link
    //     to={{
    //       pathname: `/keyboards/${keyboard.id}`,
    //       state: { keyboardId: keyboard.id },
    //     }}
    //   >
    //     <button>상세 조회</button>
    //   </Link>
    //   <div className="img-wrapper">
    //     <img
    //       className="img"
    //       src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/${keyboard.image1}`}
    //       alt={keyboard.name}
    //     />
    //   </div>
    //   <div>모델명: {keyboard.name}</div>
    //   <div>{keyboard.brand}</div>
    //   {/* switch는 객체임 */}
    //   {Object.keys(keyboard.switch).map((keySwitch, idx) => (
    //     <span key={`${keySwitch}_${idx}`}>
    //       {keyboard.switch[keySwitch] && <>{keySwitch} </>}
    //     </span>
    //   ))}
    //   <div>{keyboard.color ? '유채' : '무채'}</div>
    //   <div>{keyboard.backlight ? 'LED 있음' : 'LED 없음'}</div>
    //   <div>{keyboard.keys ? '텐키 있음' : '텐키리스'}</div>
    //   <div>{keyboard.bluetooth ? '블루투스 지원' : '블루투스 미지원'}</div>
    //   <div>{`${keyboard.price.toLocaleString()}원`}</div>
    //   <div>
    //     좋아요 {likeCount}{' '}
    //     {liked ? (
    //       <HeartFilled style={{ color: '#ff0000' }} onClick={onClickHeart} />
    //     ) : (
    //       <HeartOutlined style={{ color: '#ff0000' }} onClick={onClickHeart} />
    //     )}
    //   </div>
    // </article>
    <Card
      style={{ width: 300 }}
      cover={
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/${keyboard.image1}`}
          alt={keyboard.name}
          style={{
            maxHeight: '100px',
            objectFit: 'cover',
          }}
        />
      }
      actions={[
        <>
          {liked ? (
            <HeartFilled
              style={{ display: 'inline', color: '#ff0000' }}
              onClick={onClickHeart}
            />
          ) : (
            <HeartOutlined
              style={{ display: 'inline', color: '#ff0000' }}
              onClick={onClickHeart}
            />
          )}
          {likeCount}
        </>,
        <EditOutlined key="edit" />,
        <>
          {keyboard && (
            <Link
              to={{
                pathname: `/keyboards/${keyboard.id}`,
                state: { keyboardId: keyboard.id },
              }}
            >
              <SettingOutlined key="setting" />
            </Link>
          )}
        </>,
      ]}
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
          <span style={{ lineHeight: '24px' }}>
            {`${keyboard.brand} ${keyboard.name}`}
          </span>
        }
        description={Object.keys(keyboard.switch).map((keySwitch, idx) => (
          <span key={`${keySwitch}_${idx}`}>
            {keyboard.switch[keySwitch] && <>{keySwitchComponent[keySwitch]}</>}
          </span>
        ))}
      />
      <div style={{ height: '10px' }}></div>
      <div>{keyboard.color ? '유채' : '무채'}</div>
      <div>{keyboard.backlight ? 'LED 있음' : 'LED 없음'}</div>
      <div>{keyboard.keys ? '텐키 있음' : '텐키리스'}</div>
      <div>{keyboard.bluetooth ? '블루투스 지원' : '블루투스 미지원'}</div>
      <div>{`${keyboard.price.toLocaleString()}원`}</div>
    </Card>
  );
};

export default KeyboardCard;
