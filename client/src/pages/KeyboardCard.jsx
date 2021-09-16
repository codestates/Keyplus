import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/customAxios';
import { isError } from '../reducers/errorReducer';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import './KeyboardCard.scss';

const KeyboardCard = ({ keyboard }) => {
  const dispatch = useDispatch();

  const likes = useSelector((state) => state.likes);

  // ! 내가 이미 좋아요를 누른 상태였으면 liked가 true여야 함
  // ! 내 redux의 likes 리스트에 이 keyboard가 있어? 그럼 true야 / 근데 없어?(혹은 로그아웃이라 likes가 []) 그럼 false야)
  const checkLiked = (id) => likes.findIndex((like) => like.id === id) !== -1;

  console.log(checkLiked(keyboard.id));

  const [liked, setLiked] = useState(checkLiked(keyboard.id));
  const [likeCount, setLikeCount] = useState(keyboard.likeCount);
  const onClickHeart = async () => {
    // 만약 지금 liked: true => deleteLike 요청
    // 만약 지금 liked: false => addLike 요청

    try {
      // ! Add a Like에서 바뀐 키보드 정보를 보내줄 필요 없음 ?
      if (liked) {
        await axios.delete(`/likes/${keyboard.id}`);
        setLikeCount((prevLikeCount) => prevLikeCount - 1);
      } else {
        await axios.post(`/likes/${keyboard.id}`);
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
      }
      setLiked((prevLiked) => !prevLiked);
    } catch (err) {
      dispatch(isError(err.response));
    }
  };
  return (
    <article className="card">
      <div className="img-wrapper">
        <img
          className="img"
          src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/${keyboard.image1}`}
          alt={keyboard.name}
        />
      </div>
      <div>이름 {keyboard.name}</div>
      <div>브랜드 {keyboard.brand}</div>
      {/* switch는 객체임 */}
      <div>색상 {keyboard.color}</div>
      <div>LED {keyboard.backlight}</div>
      <div>키 배열 {keyboard.keys}</div>
      <div>블루투스 {keyboard.bluetooth}</div>
      <div>가격 {keyboard.price.toLocaleString()}</div>
      <div>
        좋아요 {likeCount}{' '}
        {liked ? (
          <AiFillHeart fill="#ff0000" onClick={onClickHeart} />
        ) : (
          <AiOutlineHeart onClick={onClickHeart} />
        )}
      </div>
    </article>
  );
};

export default KeyboardCard;
