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
} from 'antd';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (const file of event.target.img.files) {
      formData.append('img', file);
    }
    formData.append('video', event.target.video.files[0]);
    formData.append('content', '리뷰 텍스트');
    formData.append('rating', 3);
    formData.append('keyboardId', 1);
    await dispatch(addReviews(formData)).unwrap();
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
        name="accountFrm"
        onSubmit={handleSubmit}
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
