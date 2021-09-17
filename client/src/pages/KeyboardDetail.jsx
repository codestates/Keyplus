import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';
import { isError } from '../reducers/errorReducer';
import axios from '../utils/customAxios';

import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const KeyboardDetail = ({ location }) => {
  const dispatch = useDispatch();
  // ! 로그인했을 때 / 안 했을 때 고려하기
  const userId = useSelector((state) => state.user?.id);

  const keyboardId = location.state.keyboardId;
  const [keyboard, setKeyboard] = useState(null);

  const likes = useSelector((state) => state.likes);
  const checkLiked = (id) => likes.findIndex((like) => like.id === id) !== -1;

  const [liked, setLiked] = useState(checkLiked(keyboardId));
  const [likeCount, setLikeCount] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get(`/keyboards/${keyboardId}`);
      setKeyboard(response.data.data);
      setLikeCount(response.data.data.likeCount);
      setReviews(response.data.data.reviews);
    } catch (err) {
      console.log(err);
      dispatch(isError(err.response));
    }
  }, []);

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
    <>
      {keyboard && (
        <>
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
              <HeartFilled
                style={{ color: '#ff0000' }}
                onClick={onClickHeart}
              />
            ) : (
              <HeartOutlined
                style={{ color: '#ff0000' }}
                onClick={onClickHeart}
              />
            )}
          </div>

          {reviews.map((review) => (
            <>
              {review.image1 ? (
                <>
                  <div>
                    <div>{review.id} 자네는 이미지가 있다네!</div>
                    <img src={review.image1} alt={review.image1} />
                  </div>
                </>
              ) : (
                <div>{review.id} 자네는 이미지가 없다네!</div>
              )}
              <div>리뷰 내용 : {review.content}</div>
              <div>작성자 : {review.nickname}</div>
              <div>점수 : {review.rating}</div>
              <div>
                내가 썼냐? :{' '}
                {review.userId === userId
                  ? '그래 니가 썼다'
                  : '다른 사람이 썼다'}
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default KeyboardDetail;
