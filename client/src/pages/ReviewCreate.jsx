import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
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
  Divider,
  Input,
  message,
} from 'antd';

const { TextArea } = Input;
const { Meta } = Card;

import {
  HeartOutlined,
  HeartFilled,
  RightOutlined,
  LeftOutlined,
  StarFilled,
  UserOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { addReviews, updateReviews } from '../reducers/api/reviewsAPI';

const ReviewCreate = ({ location, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [previewURL, setPreviewURL] = useState([]);
  const keyboardId = props.match.params?.id;
  const [previewImage1, setPreviewImage1] = useState(
    location.state?.images[0] ?? null
  );
  const [previewImage2, setPreviewImage2] = useState(
    location.state?.images[1] ?? null
  );
  const [previewImage3, setPreviewImage3] = useState(
    location.state?.images[2] ?? null
  );
  const [previewVideo, setPreviewVideo] = useState(
    location.state?.video ?? null
  );
  const [content, setContent] = useState(location.state?.content ?? '');
  const [rating, setRating] = useState(location.state?.rating ?? 0);

  const onChangeImage = (e, num) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        switch (num) {
          case 1:
            setPreviewImage1(reader.result);
            break;
          case 2:
            setPreviewImage2(reader.result);
            break;
          case 3:
            setPreviewImage3(reader.result);
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onChangeVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewVideo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeRating = (value) => {
    setRating(value);
  };

  const onClickSubmitBtn = async (e) => {
    e.preventDefault();
    if (content === '') {
      return message.warning('리뷰 내용을 작성해주세요.');
    }

    if (rating === 0) {
      return message.warning('점수를 매겨주세요.');
    }
    try {
      const formData = new FormData();
      formData.append('img', e.target.img1.files[0]);
      formData.append('img', e.target.img2.files[0]);
      formData.append('img', e.target.img3.files[0]);
      formData.append('video', e.target.video.files[0]);
      formData.append('content', content);
      formData.append('rating', rating);

      if (location.state) {
        await dispatch(updateReviews({ formData, keyboardId })).unwrap();
      } else {
        await dispatch(addReviews({ formData, keyboardId })).unwrap();
      }
      message.success('리뷰 작성이 완료되었습니다.');
      // window.location.replace(`/keyboards/${keyboardId}`);
      history.push(`/keyboards/${keyboardId}`);
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      if (err.response.status === 409) {
        return message.warning('이미 리뷰를 남기셨습니다.');
      }
      // dispatch(isError(err.response));
      message.warning('서버에서 에러가 발생했습니다.');
    }
  };

  // const uploadButton = <div>Upload</div>;

  return (
    <>
      <form
        name="review-form"
        onSubmit={onClickSubmitBtn}
        encType="multipart/form-data"
      >
        <div>
          {/* <label htmlFor="img">여기는 이미지 3개까지 올려라</label> */}

          {/* {previewURL.length !== 0 &&
            previewURL.map((url) => (
              <div key={url}>
                <img src={url} alt={url} />
              </div>
            ))} */}
          <label
            htmlFor="img1"
            style={{ display: 'inline-block', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
              }}
            >
              {previewImage1 ? (
                <img
                  src={previewImage1}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                'upload'
              )}
            </div>
          </label>
          <input
            type="file"
            id="img1"
            name="img1"
            accept=".png, .jpg, jpeg"
            onChange={(e) => onChangeImage(e, 1)}
            hidden
          />

          <label
            htmlFor="img2"
            style={{ display: 'inline-block', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
              }}
            >
              {previewImage2 ? (
                <img
                  src={previewImage2}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                'upload'
              )}
            </div>
          </label>
          <input
            type="file"
            id="img2"
            name="img2"
            accept=".png, .jpg, jpeg"
            onChange={(e) => onChangeImage(e, 2)}
            hidden
          />

          <label
            htmlFor="img3"
            style={{ display: 'inline-block', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
              }}
            >
              {previewImage3 ? (
                <img
                  src={previewImage3}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                'upload'
              )}
            </div>
          </label>
          <input
            type="file"
            id="img3"
            name="img3"
            accept=".png, .jpg, jpeg"
            onChange={(e) => onChangeImage(e, 3)}
            hidden
          />

          {/* {previewImages.map(
            (url) =>
              url && (
                <img
                  key={url}
                  alt="previewImg"
                  src={url}
                  style={{ width: '100px', height: '100px' }}
                />
              )
          )} */}
        </div>
        <div>
          {/* <label htmlFor="video">여기는 비디오 1개만 올려라</label> */}
          <label
            htmlFor="video"
            style={{ display: 'inline-block', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '300px',
                height: '200px',
              }}
            >
              {previewVideo ? (
                <video
                  controls
                  src={previewVideo}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  type="video/mp4"
                />
              ) : (
                'upload'
              )}
            </div>
          </label>
          <input
            type="file"
            id="video"
            name="video"
            accept=".mp4"
            onChange={onChangeVideo}
            hidden
          />
          {/* {previewVideo && (
            <video
              controls
              src={previewVideo}
              style={{ width: '200px', height: '200px' }}
              type="video/mp4"
            />
          )} */}
        </div>

        <TextArea
          placeholder="리뷰를 100자까지 입력해주세요."
          showCount
          maxLength={100}
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={content}
          onChange={onChangeContent}
        />

        <Rate value={rating} onChange={onChangeRating} />

        <p>
          <Button>
            <input type="submit" value="리뷰 작성" />
          </Button>
        </p>
      </form>
    </>
  );
};

export default ReviewCreate;
