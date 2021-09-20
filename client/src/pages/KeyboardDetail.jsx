import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';
import { isError } from '../reducers/errorReducer';
import axios from '../utils/customAxios';

import {
  Carousel,
  Card,
  Empty,
  Rate,
  Avatar,
  Button,
  Upload,
  message,
} from 'antd';

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

const KeyboardDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // ! 로그인했을 때 / 안 했을 때 고려하기
  const userId = useSelector((state) => state.user?.id);
  const likes = useSelector((state) => state.likes);

  const keyboardId = props.match.params?.id;
  const [keyboard, setKeyboard] = useState(null);

  const checkLiked = (id) => likes.findIndex((like) => like.id == id) !== -1;
  const [liked, setLiked] = useState(checkLiked(keyboardId));

  const [likeCount, setLikeCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(async () => {
    try {
      const response = await axios.get(`/keyboards/${keyboardId}`);
      const keyboard = response.data.data;
      setKeyboard(keyboard);
      setLikeCount(keyboard.likeCount);
      setReviews(keyboard.reviews);

      setAverageRating(
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

  const onClickCreateReviewBtn = () => {
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].userId === userId) {
        return message.warning('이미 리뷰를 남기셨습니다.');
      }
    }
    history.push({
      pathname: `/review/${keyboardId}`,
    });
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
            좋아요 {likeCount}
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

          <h1 style={{ marginTop: '30px' }}>리뷰</h1>

          {reviews.length ? (
            <>
              <div>
                <Button type="primary" onClick={onClickCreateReviewBtn}>
                  리뷰 작성하기
                </Button>
              </div>
              평균 평점
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
                  {review.image1 || review.video ? (
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
                          <video className="keyboard-detail-video" controls>
                            <source src={review.video} type="video/mp4" />
                          </video>
                        </>
                      )}

                      {review.image1 && (
                        <>
                          <img
                            src={review.image1}
                            alt={review.image1}
                            className="keyboard-detail-img"
                          />
                        </>
                      )}

                      {review.image2 && (
                        <>
                          <img
                            src={review.image2}
                            alt={review.image2}
                            className="keyboard-detail-img"
                          />
                        </>
                      )}

                      {review.image3 && (
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

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      {review.userImage ? (
                        <Avatar src={review.userImage} />
                      ) : (
                        <Avatar icon={<UserOutlined />} />
                      )}
                    </div>
                    <div>
                      <Rate disabled defaultValue={review.rating} />
                      <div style={{ display: 'flex', lineHeight: '14px' }}>
                        <span style={{ marginRight: '5px' }}>
                          {review.nickname}
                        </span>
                        <span
                          style={{
                            fontSize: '8px',
                            letterSpacing: '-0.05em',
                          }}
                        >
                          {review.createdAt.split('T')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {review.userId === userId && (
                      <>
                        <Button>
                          <Link
                            to={{
                              pathname: `/review/${keyboardId}`,
                              state: {
                                content: review.content,
                                rating: review.rating,
                                images: [
                                  review.image1,
                                  review.image2,
                                  review.image3,
                                ],
                                video: review.video,
                              },
                            }}
                          >
                            수정
                          </Link>
                        </Button>
                        <DeleteModal
                          modalText="정말로 삭제하시겠습니까?"
                          loadingText="삭제 진행중입니다."
                          buttonText="삭제"
                          action={deleteReviews}
                          keyboardId={keyboardId}
                        />
                      </>
                    )}
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
              <Button type="primary" onClick={onClickCreateReviewBtn}>
                리뷰 작성하기
              </Button>
            </Empty>
          )}
        </>
      )}
    </>
  );
};

export default KeyboardDetail;
