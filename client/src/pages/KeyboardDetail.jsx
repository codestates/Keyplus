import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addLikes, deleteLikes } from '../reducers/api/likesAPI';
import { deleteReviews } from '../reducers/api/reviewsAPI';
import axios from '../utils/customAxios';
import DeleteModal from '../components/DeleteModal';

import './styles/KeyboardDetail.scss';

import { Carousel, Empty, Rate, Avatar, Button, message, Tabs } from 'antd';
const { TabPane } = Tabs;
import {
  HeartOutlined,
  HeartFilled,
  StarFilled,
  UserOutlined,
} from '@ant-design/icons';
import { yellow } from '@ant-design/colors';
import Rating from 'react-rating';

const LeftArrow = ({ currentSlide, slideCount, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const RightArrow = ({ currentSlide, slideCount, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const KeyboardDetail = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();
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
      return message.warning('서버 에러가 발생했습니다.');
    }
  }, []);

  const onClickHeart = useCallback(async () => {
    if (!userId) {
      return message.warning('로그인을 먼저 해주세요.');
    }
    try {
      if (liked) {
        await dispatch(deleteLikes(keyboardId)).unwrap();
        setLikeCount((prevLikeCount) => prevLikeCount - 1);
      } else {
        await dispatch(addLikes(keyboardId)).unwrap();
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
      }
      setLiked((prevLiked) => !prevLiked);
    } catch (err) {
      return message.warning('서버 에러가 발생했습니다.');
    }
  }, [userId, keyboardId, liked]);

  const onClickCreateReviewBtn = useCallback(() => {
    if (!userId) {
      return message.warning('로그인을 먼저 해주세요.');
    }
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].userId === userId) {
        return message.warning('이미 리뷰를 남기셨습니다.');
      }
    }
    history.push({
      pathname: `/review/${keyboardId}`,
    });
  }, [userId, keyboardId, reviews]);

  return (
    <>
      {keyboard && (
        <div className="keyboard-detail">
          <div className="keyboard-detail-info">
            <Carousel
              autoplay
              dots
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
            <div className="keyboard-name-like">
              <div className="keyboard-name">
                {keyboard.brand}
                {keyboard.name}
              </div>

              <div className="keyboard-like">
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
            </div>

            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Tab 1" key="1">
                <div className="keyboard-detail-info-text">
                  <div>
                    <div>색상</div>
                    <div className="keyboard-color">
                      {keyboard.color ? '다채색' : '무채색'}
                    </div>
                  </div>
                  <div>
                    <div>백라이트</div>
                    <div className="keyboard-backlight">
                      {keyboard.backlight ? '지원' : '미지원'}
                    </div>
                  </div>
                  <div>
                    <div>텐키</div>
                    <div className="keyboard-tenkey">
                      {keyboard.tenkey ? '있음' : '없음'}
                    </div>
                  </div>
                  <div>
                    <div>블루투스</div>
                    <div className="keyboard-bluetooth">
                      {keyboard.bluetooth ? '지원' : '미지원'}
                    </div>
                  </div>
                  <div>
                    <div>가격</div>
                    <div className="keyboard-price">
                      {keyboard.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Tab 2" key="2">
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
                        {review.image1 ||
                        review.image2 ||
                        review.image3 ||
                        review.video ? (
                          <Carousel
                            infinite={false}
                            dots
                            arrows
                            draggable
                            prevArrow={<LeftArrow />}
                            nextArrow={<RightArrow />}
                            className="keyboard-detail-carousel"
                          >
                            {review.video && (
                              <>
                                <video
                                  className="keyboard-detail-video"
                                  controls
                                >
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
                            <div
                              style={{ display: 'flex', lineHeight: '14px' }}
                            >
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
              </TabPane>
            </Tabs>
          </div>
          {/* <h1 style={{ marginTop: '30px' }}>리뷰</h1> */}
        </div>
      )}
    </>
  );
};

export default KeyboardDetail;
