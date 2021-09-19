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
} from '@ant-design/icons';

import { addReviews } from '../reducers/api/reviewsAPI';

const Test = () => {
  const dispatch = useDispatch();
  // const [fileList, setFileList] = useState([]);

  // const onChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };
  // const onClickCreateReviewBtn = async () => {
  //   try {
  //     const formData = new FormData();
  //     for (const key of Object.keys(fileList)) {
  //       formData.append('file', fileList[key]);
  //     }
  //     formData.append('content', '리뷰 텍스트');
  //     formData.append('rating', 3);
  //     formData.append('keyboardId', 1);
  //     // console.log('보내기 전 🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮');
  //     // for (var value of formData.keys()) {
  //     //   console.log(value);
  //     // }
  //     await dispatch(addReviews(formData)).unwrap();
  //   } catch (err) {
  //     console.log(err);
  //     dispatch(isError(err.response));
  //   }
  //   console.log(fileList);
  // };

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

  return (
    <>
      <form
        name="accountFrm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <p>
          <label htmlFor="img">여기는 이미지 3개까지 올려라</label>
          <input
            type="file"
            id="img"
            accept="image/jpg, image/png, image/jpeg, image/gif"
            name="img"
            multiple
          ></input>
        </p>
        <p>
          <label htmlFor="video">여기는 비디오 1개만 올려라</label>
          <input type="file" id="video" accept="video/*" name="video" />
        </p>
        <p>
          <input type="submit" value="리뷰 작성" />
        </p>
      </form>
    </>
  );
};

export default Test;
