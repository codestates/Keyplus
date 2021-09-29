import React from 'react';
import { Link } from 'react-router-dom';

import { deleteReviews } from '../reducers/api/reviewsAPI';
import DeleteModal from './DeleteModal';

import './styles/Review.scss';

import { Avatar, Button, Carousel, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const LeftArrow = ({ currentSlide, slideCount, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const RightArrow = ({ currentSlide, slideCount, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const Review = ({ review, userId }) => {
  return (
    <>
      {(review.image1 || review.image2 || review.image3 || review.video) && (
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
              <video className="review-video" controls playsinline>
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
              <span className="date">{review.createdAt.split('T')[0]}</span>
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
                pathname: `/review/${review.keyboardId}`,
                state: {
                  content: review.content,
                  rating: review.rating,
                  images: [review.image1, review.image2, review.image3],
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
            keyboardId={review.keyboardId}
          />
        </div>
      )}
    </>
  );
};

export default Review;
