import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addLikes, deleteLikes } from '../reducers/api/likesAPI';
import { deleteReviews } from '../reducers/api/reviewsAPI';
import axios from '../utils/customAxios';
import DeleteModal from '../components/DeleteModal';

import './styles/KeyboardDetail.scss';

import {
  Carousel,
  Empty,
  Rate,
  Avatar,
  Button,
  message,
  Tabs,
  List,
  Card,
  Space,
} from 'antd';
const { TabPane } = Tabs;
import {
  HeartOutlined,
  HeartFilled,
  StarFilled,
  UserOutlined,
  MessageFilled,
} from '@ant-design/icons';
import { yellow } from '@ant-design/colors';
import Rating from 'react-rating';

const LeftArrow = ({ currentSlide, slideCount, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const RightArrow = ({ currentSlide, slideCount, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const data = [
  {
    title: '색상',
    content: '짧음',
  },
  {
    title: '색상',
    content: '짧음',
  },
  {
    title: '색상',
    content: '짧음',
  },
  {
    title: '색상',
    content: '짧음',
  },
];

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

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
                {keyboard.brand} {keyboard.name}
              </div>

              <div className="keyboard-like">
                <span className="like-heart">
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
                </span>
                <span className="like-count">{likeCount}</span>
              </div>
            </div>

            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="상세정보" key="1">
                <List grid>
                  <List.Item>
                    <Card title="Color">
                      {keyboard.color ? '다채색' : '무채색'}
                    </Card>
                  </List.Item>
                  <List.Item>
                    <Card title="BackLight">
                      {keyboard.bluetooth ? '지원' : '미지원'}
                    </Card>
                  </List.Item>
                  <List.Item>
                    <Card title="TenKey">
                      {keyboard.tenkey ? '있음' : '없음'}
                    </Card>
                  </List.Item>
                  <List.Item>
                    <Card title="Bluetooth">
                      {keyboard.bluetooth ? '지원' : '미지원'}
                    </Card>
                  </List.Item>
                  <List.Item>
                    <Card title="Price">
                      {keyboard.price.toLocaleString()}원
                    </Card>
                  </List.Item>
                </List>
              </TabPane>
              <TabPane tab="리뷰" key="2">
                {reviews.length ? (
                  <>
                    <div className="review-create-button-wrapper">
                      <Button onClick={onClickCreateReviewBtn}>
                        리뷰 작성하기
                      </Button>
                    </div>
                    <div className="reviews-info">
                      <div className="reviews-rating">
                        <span className="title">사용자 총 평점</span>
                        <Rating
                          initialRating={averageRating.toFixed(1)}
                          fractions={10}
                          readonly
                          emptySymbol={
                            <StarFilled
                              style={{
                                fontSize: '30px',
                                color: '#f0f0f0',
                              }}
                            />
                          }
                          fullSymbol={
                            <StarFilled
                              style={{
                                fontSize: '30px',
                                color: yellow[5],
                                // marginRight: '8px',
                              }}
                            />
                          }
                        />
                        <div className="number-wrapper">
                          <span className="number">
                            {averageRating.toFixed(1)}
                          </span>
                          /5
                        </div>
                      </div>
                      <div className="reviews-count">
                        <span className="title">전체 리뷰수</span>
                        <MessageFilled style={{ fontSize: '30px' }} />
                        <div className="number-wrapper">
                          <span className="number"> {reviews.length}</span>
                        </div>
                      </div>
                    </div>

                    {reviews.map((review, idx) => (
                      <div key={`${review}_${idx}`} className="review">
                        {(review.image1 ||
                          review.image2 ||
                          review.image3 ||
                          review.video) && (
                          <Carousel
                            infinite={false}
                            dots
                            arrows
                            draggable
                            prevArrow={<LeftArrow />}
                            nextArrow={<RightArrow />}
                            className="review-carousel"
                          >
                            {review.video && (
                              <>
                                <video className="review-video" controls>
                                  <source src={review.video} type="video/mp4" />
                                </video>
                              </>
                            )}

                            {review.image1 && (
                              <>
                                <img
                                  src={review.image1}
                                  alt={review.image1}
                                  className="review-img"
                                />
                              </>
                            )}

                            {review.image2 && (
                              <>
                                <img
                                  src={review.image2}
                                  alt={review.image2}
                                  className="review-img"
                                />
                              </>
                            )}

                            {review.image3 && (
                              <>
                                <img
                                  src={review.image3}
                                  alt={review.image3}
                                  className="review-img"
                                />
                              </>
                            )}
                          </Carousel>
                        )}
                        <div className="review-info">
                          <div className="review-profile">
                            <div className="review-profile-image">
                              {review.userImage ? (
                                <Avatar src={review.userImage} />
                              ) : (
                                <Avatar icon={<UserOutlined />} />
                              )}
                            </div>
                            <div>
                              <Rate disabled defaultValue={review.rating} />
                              <div className="name-date">
                                <span className="name">{review.nickname}</span>
                                <span className="date">
                                  {review.createdAt.split('T')[0]}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="review-text">{review.content}</div>
                        </div>
                        {review.userId === userId && (
                          <div className="review-button">
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
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="no-data-area">
                    <img
                      src="/no-data.jpg"
                      alt="no data"
                      style={{
                        maxWidth: '350px',
                        objectFit: 'cover',
                      }}
                    />
                    <div style={{ marginBottom: '20px' }}>
                      작성된 리뷰가 없습니다!
                    </div>
                    <Button type="primary" onClick={onClickCreateReviewBtn}>
                      리뷰 작성하기
                    </Button>
                  </div>
                )}
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyboardDetail;
