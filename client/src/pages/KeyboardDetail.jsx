import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';
import axios from '../utils/customAxios';
import Review from '../components/Review';
import Button from '../components/Button';
import { Carousel, message, Tabs, List, Card } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  StarFilled,
  MessageFilled,
} from '@ant-design/icons';
import { yellow } from '@ant-design/colors';
import Rating from 'react-rating';
import './styles/KeyboardDetail.scss';
const { TabPane } = Tabs;
const LeftArrow = ({ currentSlide, slideCount, children, ...props }) => {
  return <div {...props}>{children}</div>;
};
const RightArrow = ({ currentSlide, slideCount, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

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
          marginRight: '2px',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '14px' }}>저적</span>
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
          marginRight: '2px',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '14px' }}>적축</span>
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
          marginRight: '2px',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '14px' }}>청축</span>
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
          marginRight: '2px',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '14px' }}>갈축</span>
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
          marginRight: '2px',
        }}
      ></span>
      <span style={{ verticalAlign: 'middle', fontSize: '14px' }}>흑축</span>
    </div>
  ),
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
      return message.warning('오류가 발생하여 로그아웃됩니다.');
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
              <div className="keyboard-like" onClick={onClickHeart}>
                <span className="like-heart">
                  {liked ? (
                    <HeartFilled style={{ color: '#ff0000' }} />
                  ) : (
                    <HeartOutlined style={{ color: '#ff0000' }} />
                  )}
                </span>
                <span className="like-count">{likeCount}</span>
              </div>
            </div>
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="상세정보" key="1">
                <List grid>
                  <List.Item>
                    <Card title="Switch">
                      {Object.keys(keyboard.switch).map(
                        (keySwitch, idx) =>
                          keyboard.switch[keySwitch] && (
                            <span
                              key={`${keySwitch}_${idx}`}
                              className="keyboard-detail-switch"
                            >
                              <>{keySwitchComponent[keySwitch]}</>
                            </span>
                          )
                      )}
                    </Card>
                  </List.Item>
                  <List.Item>
                    <Card title="Price">
                      {keyboard.price.toLocaleString()}원
                    </Card>
                  </List.Item>
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
                </List>
              </TabPane>
              <TabPane tab="리뷰" key="2">
                {reviews.length ? (
                  <>
                    <div className="review-create-button-wrapper">
                      <Button>
                        <button onClick={onClickCreateReviewBtn}>
                          리뷰 작성하기
                        </button>
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
                        <Review review={review} userId={userId} />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="no-data-area">
                    <img
                      src="/others/no-data.jpg"
                      alt="no data"
                      style={{
                        maxWidth: '350px',
                        objectFit: 'cover',
                      }}
                    />
                    <div style={{ marginBottom: '20px' }}>
                      작성된 리뷰가 없습니다!
                    </div>
                    <Button>
                      <button onClick={onClickCreateReviewBtn}>
                        리뷰 작성하기
                      </button>
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
