import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';
import { isError } from '../reducers/errorReducer';
import axios from '../utils/customAxios';

import './styles/ReviewCreate.scss';

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
import { IoCloseOutline } from 'react-icons/io5';
// import {
//   AiOutlinePicture,
//   AiOutlinePlayCircle,
//   AiOutlineUpload,
// } from 'react-icons/ai';
import { RiImageAddFill, RiVideoAddFill } from 'react-icons/ri';

import { addReviews, updateReviews } from '../reducers/api/reviewsAPI';

const ReviewCreate = ({ location, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const [deleteImg1, setDeleteImg1] = useState(0);
  const [deleteImg2, setDeleteImg2] = useState(0);
  const [deleteImg3, setDeleteImg3] = useState(0);
  const [deleteVideo, setDeleteVideo] = useState(0);

  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const videoRef = useRef(null);

  //* onChange
  const onChangeImage = (e, num) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        switch (num) {
          case 1:
            setPreviewImage1(reader.result);
            setDeleteImg1(0);
            break;
          case 2:
            setPreviewImage2(reader.result);
            setDeleteImg2(0);
            break;
          case 3:
            setPreviewImage3(reader.result);
            setDeleteImg3(0);
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
      setDeleteVideo(0);
    }
  };

  //* handleRef
  const handleImgRef = (num) => {
    switch (num) {
      case 1:
        img1Ref.current.click();
        break;
      case 2:
        img2Ref.current.click();
        break;
      case 3:
        img3Ref.current.click();
        break;
      default:
        break;
    }
  };

  const handleVideoRef = () => {
    videoRef.current.click();
  };

  //* onClickDeleteBtn
  const onClickDeleteImgBtn = (num) => {
    switch (num) {
      case 1:
        setPreviewImage1(null);
        img1Ref.current.value = null;
        setDeleteImg1(1);
        break;
      case 2:
        setPreviewImage2(null);
        img2Ref.current.value = null;
        setDeleteImg2(1);
        break;
      case 3:
        setPreviewImage3(null);
        img3Ref.current.value = null;
        setDeleteImg3(1);
        break;
      default:
        break;
    }
  };

  const onClickDeleteVideoBtn = () => {
    setPreviewVideo(null);
    videoRef.current.value = null;
    setDeleteVideo(1);
  };

  //* onChange
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
      const data = {};

      data['keyboardId'] = keyboardId;

      if (e.target.img1.files) {
        formData.append('img1', e.target.img1.files[0]);
      }
      data['image1'] = previewImage1;

      if (e.target.img2.files) {
        formData.append('img2', e.target.img2.files[0]);
      }
      data['image2'] = previewImage2;

      if (e.target.img3.files) {
        formData.append('img3', e.target.img3.files[0]);
      }
      data['image3'] = previewImage3;

      if (e.target.video.files) {
        formData.append('video', e.target.video.files[0]);
      }
      data['video'] = previewVideo;

      formData.append('content', content);
      data['content'] = content;

      formData.append('rating', rating);
      data['rating'] = rating;

      formData.append('deleteImg1', deleteImg1);
      formData.append('deleteImg2', deleteImg2);
      formData.append('deleteImg3', deleteImg3);
      formData.append('deleteVideo', deleteVideo);

      if (location.state) {
        await dispatch(updateReviews({ formData, data })).unwrap();
      } else {
        await dispatch(addReviews({ formData, data })).unwrap();
      }
      message.success('리뷰 작성이 완료되었습니다.');
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
  return (
    <div className="review-create">
      <h1 className="review-create-header">Review </h1>
      <form
        name="review-form"
        onSubmit={onClickSubmitBtn}
        encType="multipart/form-data"
        className="review-create-form"
      >
        <div className="input-files-area">
          <div className="input-file">
            <input
              type="file"
              id="img1"
              name="img1"
              accept=".png, .jpg, jpeg"
              onChange={(e) => onChangeImage(e, 1)}
              ref={img1Ref}
              hidden
            />
            {previewImage1 ? (
              <div className="preview-image-wrapper">
                <img
                  src={previewImage1}
                  alt="preview"
                  className="preview-image"
                />
                <div
                  className="hover-overlay"
                  onClick={() => onClickDeleteImgBtn(1)}
                >
                  <IoCloseOutline
                    style={{
                      color: 'white',
                      width: '50px',
                      height: '50px',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="upload-icon" onClick={() => handleImgRef(1)}>
                <RiImageAddFill style={{ fontSize: '40px' }} />
              </div>
            )}
          </div>
          <div className="input-file">
            <input
              type="file"
              id="img2"
              name="img2"
              accept=".png, .jpg, jpeg"
              onChange={(e) => onChangeImage(e, 2)}
              ref={img2Ref}
              hidden
            />
            {previewImage2 ? (
              <div className="preview-image-wrapper">
                <img
                  src={previewImage2}
                  alt="preview"
                  className="preview-image"
                />
                <div
                  className="hover-overlay"
                  onClick={() => onClickDeleteImgBtn(2)}
                >
                  <IoCloseOutline
                    style={{
                      color: 'white',
                      width: '50px',
                      height: '50px',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="upload-icon" onClick={() => handleImgRef(2)}>
                <RiImageAddFill style={{ fontSize: '40px' }} />
              </div>
            )}
          </div>
          <div className="input-file">
            <input
              type="file"
              id="img3"
              name="img3"
              accept=".png, .jpg, jpeg"
              onChange={(e) => onChangeImage(e, 3)}
              ref={img3Ref}
              hidden
            />
            {previewImage3 ? (
              <div className="preview-image-wrapper">
                <img
                  src={previewImage3}
                  alt="preview"
                  className="preview-image"
                />
                <div
                  className="hover-overlay"
                  onClick={() => onClickDeleteImgBtn(3)}
                >
                  <IoCloseOutline
                    style={{
                      color: 'white',
                      width: '50px',
                      height: '50px',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="upload-icon" onClick={() => handleImgRef(3)}>
                {/* 이미지
                <br />
                업로드 */}
                <div style={{ display: 'flex' }}>
                  <RiImageAddFill style={{ fontSize: '40px' }} />
                </div>
              </div>
            )}
          </div>

          <div className="input-file">
            <input
              type="file"
              id="video"
              name="video"
              accept=".mp4"
              onChange={onChangeVideo}
              ref={videoRef}
              hidden
            />
            {previewVideo ? (
              <div className="preview-image-wrapper">
                {/* <div className="preview-video-container"> */}
                <video
                  playsinline
                  poster
                  type="video/mp4"
                  src={previewVideo}
                  className="preview-video"
                />
                {/* </div> */}
                <div className="hover-overlay" onClick={onClickDeleteVideoBtn}>
                  <IoCloseOutline
                    style={{
                      color: 'white',
                      width: '40px',
                      height: '40px',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="upload-icon" onClick={handleVideoRef}>
                {/* 동영상
                <br />
                  업로드 */}
                <RiVideoAddFill style={{ fontSize: '40px' }} />
              </div>
            )}
          </div>
        </div>

        <TextArea
          placeholder="리뷰를 500자까지 입력해주세요."
          showCount
          maxLength={500}
          autoSize={{ minRows: 4, maxRows: 8 }}
          value={content}
          onChange={onChangeContent}
          className="review-create-content"
        />

        <div className="review-create-rating-wrapper">
          <p>별을 눌러 점수를 매겨주세요.</p>
          <Rate
            value={rating}
            onChange={onChangeRating}
            style={{ fontSize: '30px' }}
          />
        </div>

        <div className="review-create-button-wrapper">
          <Button type="primary">
            <input type="submit" value="리뷰 작성" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewCreate;
