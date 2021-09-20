import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';
import { isError } from '../reducers/errorReducer';
import axios from '../utils/customAxios';

import { Carousel, Card, Empty, Rate, Avatar, Button, Upload } from 'antd';

const { Meta } = Card;
import {
  HeartOutlined,
  HeartFilled,
  RightOutlined,
  LeftOutlined,
  StarFilled,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { yellow } from '@ant-design/colors';

import Rating from 'react-rating';

import './KeyboardDetail.scss';
import { addReviews, deleteReviews } from '../reducers/api/reviewsAPI';
import DeleteModal from '../components/DeleteModal';

const LeftArrow = ({ currentSlide, slideCount, children, ...props }) => {
  // return <Button icon={<LeftOutlined />} {...props} />;

  return <div {...props}>{children}</div>;
};

const RightArrow = ({ currentSlide, slideCount, children, ...props }) => {
  // return <Button icon={<RightOutlined />} {...props} />;
  return <div {...props}>{children}</div>;
};

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
  const [reviewImageCounts, setReviewImageCounts] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(async () => {
    try {
      const response = await axios.get(`/keyboards/${keyboardId}`);
      const keyboard = response.data.data;
      setKeyboard(keyboard);
      setLikeCount(keyboard.likeCount);
      setReviews(keyboard.reviews);
      setReviewImageCounts(
        keyboard.reviews.map((review) => {
          if (review.image3) return 3;
          if (review.image2) return 2;
          if (review.image1) return 1;
          return 0;
        })
      );
      setAverageRating(
        keyboard.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
          keyboard.reviews.length
      );
      console.log(
        '평균',
        keyboard.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
          keyboard.reviews.length
      );
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

  const onClickCreateReviewBtn = async () => {
    try {
      await dispatch(
        addReviews({ keyboardId, content: '리뷰 테스트', rating: 3 })
      ).unwrap();
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  // ! 리뷰 이미지가 0개면 no data
  // ! 리뷰 이미지가 1개 이상이면 그때부터 캐러셀을 여는데 항목 개수가 2개 이상일 때만

  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <>
      {keyboard && (
        <>
          <Carousel
            autoplay
            dots={false}
            arrows
            draggable
            prevArrow={<LeftArrow />}
            nextArrow={<RightArrow />}
            className="keyboard-detail-carousel"
          >
            {keyboard.image1 && (
              <img
                className="keyboard-detail-img"
                src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/${keyboard.image1}`}
                alt={keyboard.name}
              />
            )}
            {keyboard.image2 && (
              <img
                className="keyboard-detail-img"
                src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/${keyboard.image2}`}
                alt={keyboard.name}
              />
            )}
            {keyboard.image3 && (
              <img
                className="keyboard-detail-img"
                src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/${keyboard.image3}`}
                alt={keyboard.name}
              />
            )}
            {keyboard.image4 && (
              <img
                className="keyboard-detail-img"
                src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/${keyboard.image4}`}
                alt={keyboard.name}
              />
            )}
            {keyboard.image5 && (
              <img
                className="keyboard-detail-img"
                src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/${keyboard.image5}`}
                alt={keyboard.name}
              />
            )}
          </Carousel>
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

          {/* image3이 있으면 3, image2가 있으면 2, image1이 있으면 1 */}

          <h1 style={{ marginTop: '30px' }}>아래는 리뷰칸이지롱</h1>
          {/* <div>
            <Button onClick={onClickCreateReviewBtn}>리뷰 작성</Button>
            <input
              id="img-upload"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              multiple
              hidden
            />
            <label htmlFor="img-upload">
              <img
                src="https://picsum.photos/200/300"
                width="100"
                height="100"
              />
            </label>
            <input type="file" accept="video/*" hidden />
            <label htmlFor="img-upload">
              <img
                src="https://picsum.photos/200/300"
                width="100"
                height="100"
              />
            </label>
          </div> */}

          {reviews.length ? (
            <>
              이것은 너의 평균 평점이다
              <Rating
                initialRating={averageRating.toFixed(1)}
                fractions={10}
                readonly
                emptySymbol={
                  <StarFilled
                    style={{
                      fontSize: '20px',
                      color: '#f0f0f0',
                    }}
                  />
                }
                fullSymbol={
                  <StarFilled
                    style={{
                      fontSize: '20px',
                      color: yellow[5],
                      // marginRight: '8px',
                    }}
                  />
                }
              />
              {reviews.map((review, idx) => (
                <div key={`${review}_${idx}`}>
                  {reviewImageCounts[idx] || review.video ? (
                    <Carousel
                      infinite={false}
                      dots={false}
                      arrows
                      draggable
                      prevArrow={<LeftArrow />}
                      nextArrow={<RightArrow />}
                      className="keyboard-detail-carousel"
                    >
                      {review.video && (
                        <>
                          <div className="video-cover">
                            <video className="keyboard-detail-video" controls>
                              <source
                                src={`${process.env.REACT_APP_IMAGE_URL}/main.mp4`}
                                type="video/mp4"
                              />
                            </video>
                          </div>
                        </>
                      )}

                      {reviewImageCounts[idx] >= 1 && (
                        <>
                          <img
                            src={review.image1}
                            alt={review.image1}
                            className="keyboard-detail-img"
                          />
                        </>
                      )}

                      {reviewImageCounts[idx] >= 2 && (
                        <>
                          <img
                            src={review.image2}
                            alt={review.image2}
                            className="keyboard-detail-img"
                          />
                        </>
                      )}

                      {reviewImageCounts[idx] >= 3 && (
                        <>
                          <img
                            src={review.image3}
                            alt={review.image3}
                            className="keyboard-detail-img"
                          />
                        </>
                      )}
                    </Carousel>
                  ) : (
                    <img
                      src="/no-image.png"
                      alt="no image"
                      className="keyboard-detail-img"
                    />
                  )}
                  <div>리뷰 내용 : {review.content}</div>
                  <div>안녕하세요 {review.nickname}님?</div>
                  {review.userImage ? (
                    <Avatar src={review.userImage} />
                  ) : (
                    <Avatar icon={<UserOutlined />} />
                  )}
                  <Rate disabled defaultValue={review.rating} />
                  <div>
                    내가 썼냐?
                    {review.userId === userId
                      ? ' 그래 니가 썼다'
                      : ' 다른 사람이 썼다'}
                    <button type="button">
                      <EditOutlined />
                    </button>
                    <button type="button">
                      <DeleteOutlined />
                    </button>
                  </div>
                  <div>
                    언제 썼는지도 보여줘라 {review.createdAt.split('T')[0]}
                  </div>
                </div>
              ))}
            </>
          ) : (
            // <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            <Empty
              image={`/no-data.webp`}
              // image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{
                height: 300,
              }}
              description={<span>작성된 리뷰가 없습니다!</span>}
            >
              <Button type="primary">리뷰 작성하러 가기</Button>
            </Empty>
          )}
        </>
      )}
      <DeleteModal
        modalText="정말로 삭제하시겠습니까?"
        loadingText="삭제 진행중입니다."
        buttonText="리뷰 삭제"
        action={deleteReviews}
        keyboardId={keyboardId}
      />
    </>
  );
};

export default KeyboardDetail;
