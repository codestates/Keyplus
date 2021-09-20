import React, { useEffect, useState, useRef } from 'react';
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

import { addReviews } from '../reducers/api/reviewsAPI';

const Test = () => {
  const dispatch = useDispatch();
  // const [previewURL, setPreviewURL] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const onChangeImages = (e) => {
    const files = [...e.target.files];
    if (files) {
      setPreviewImages([]);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((previewImages) => [
            ...previewImages,
            reader.result,
          ]);
        };
        reader.readAsDataURL(file);
      });
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
    try {
      e.preventDefault();
      const formData = new FormData();

      for (const file of e.target.img.files) {
        formData.append('img', file);
      }
      formData.append('video', e.target.video.files[0]);
      formData.append('content', content);
      formData.append('rating', rating);
      formData.append('keyboardId', 1);
      const res = await dispatch(addReviews(formData)).unwrap();
      message.success('리뷰 작성이 완료되었습니다.');
      return res;
    } catch (err) {
      if (err.response.status === 409) {
        return message.warning('이미 리뷰를 남기셨습니다.');
      }
      // dispatch(isError(err.response));
      message.warning('서버에서 에러가 발생했습니다.');
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <form
        name="review-form"
        onSubmit={onClickSubmitBtn}
        encType="multipart/form-data"
      >
        <p>
          {/* <label htmlFor="img">여기는 이미지 3개까지 올려라</label> */}

          {/* {previewURL.length !== 0 &&
            previewURL.map((url) => (
              <div key={url}>
                <img src={url} alt={url} />
              </div>
            ))} */}
          {/* <label htmlFor="img">
            <div style={{ width: '100px', height: '100px' }}>
              {previewImages[0] ? (
                <img src={previewImages[0]} style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </div>

            <div style={{ width: '100px', height: '100px' }}>
              {previewImages[1] ? (
                <img src={previewImages[1]} style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </div>

            <div style={{ width: '100px', height: '100px' }}>
              {previewImages[2] ? (
                <img src={previewImages[2]} style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </div>
          </label> */}
          {previewImages.map((url) => {
            return (
              <img
                key={url}
                alt="previewImg"
                src={url}
                style={{ width: '100px', height: '100px' }}
              />
            );
          })}
          <input
            type="file"
            id="img"
            multiple
            name="img"
            accept=".png, .jpg, jpeg"
            onChange={onChangeImages}
          />
        </p>
        <p>
          {/* <label htmlFor="video">여기는 비디오 1개만 올려라</label> */}
          {/* <label htmlFor="video">
            {previewVideo ? (
              <video
                controls
                src={previewVideo}
                style={{ width: '200px', height: '200px' }}
                type="video/mp4"
              />
            ) : (
              <img
                src={`https://picsum.photos/200/300`}
                width="200"
                height="200"
              />
            )}
          </label> */}
          {previewVideo && (
            <video
              controls
              src={previewVideo}
              style={{ width: '200px', height: '200px' }}
              type="video/mp4"
            />
          )}
          <input
            type="file"
            id="video"
            accept=".mp4"
            name="video"
            onChange={onChangeVideo}
          />
        </p>

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

export default Test;
