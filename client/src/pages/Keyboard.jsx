import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/customAxios';
import exceptionAxios from 'axios';
import KeyboardCard from './KeyboardCard';

import './Keyboard.scss';
import { isError } from '../reducers/errorReducer';
import { logIn } from '../reducers/api/userAPI';
import 'antd/dist/antd.css';
import {
  Select,
  Space,
  Typography,
  Divider,
  Checkbox,
  Radio,
  InputNumber,
} from 'antd';
const { Option } = Select;

import { FaCheck } from 'react-icons/fa';

const Keyboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  /*
  1. 모든 키보드 정보를 받아온다.
  2. 카드(별도 컴포넌트)에 map 돌려서 정보 넣는다.
  3. 각각의 카드에 props로 정보를 넘겨준다.
  4. 하트를 카드에서 누르면 좋아요 수가 바뀌어야 한다. *****
  5. 각각의 키보드 상세페이지에서도 하트를 누를 수 있다.
  */

  const [keyboards, setKeyboards] = useState([]);
  const [priceRadio, setPriceRadio] = useState(0);

  useEffect(async () => {
    try {
      // await dispatch(
      //   logIn({
      //     email: 'kimcoding333@github.com',
      //     password: 'test',
      //   })
      // ).unwrap();
      const response = await axios.get('/keyboards');
      setKeyboards(
        response.data.data.sort((a, b) => b.likeCount - a.likeCount)
      );
    } catch (err) {
      console.log(err);
      dispatch(isError(err.response));
    }
  }, []);

  const onClickHeartDescendingBtn = async () => {
    try {
      const response = await exceptionAxios.get('/keyboards');
      setKeyboards(
        response.data.data.sort((a, b) => b.likeCount - a.likeCount)
      );
    } catch (err) {
      console.log(err);
      dispatch(isError(err.response));
    }
  };
  const onClickHeartAscendingBtn = async () => {
    try {
      const response = await exceptionAxios.get('/keyboards');
      setKeyboards(
        response.data.data.sort((a, b) => a.likeCount - b.likeCount)
      );
    } catch (err) {
      console.log(err);
      dispatch(isError(err.response));
    }
  };

  const onClickReviewDescendingBtn = async () => {
    setKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => b.reviewCount - a.reviewCount)
    );
  };
  const onClickReviewAscendingBtn = async () => {
    setKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => a.reviewCount - b.reviewCount)
    );
  };

  const onClickPriceDescendingBtn = async () => {
    setKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => b.price - a.price)
    );
  };
  const onClickPriceAscendingBtn = async () => {
    setKeyboards((keyboards) =>
      [...keyboards].sort((a, b) => a.price - b.price)
    );
  };

  // async function handleChange(value) {
  //   switch (value) {
  //     case '1':
  //       try {
  //         const response = await exceptionAxios.get('/keyboards');
  //         setKeyboards(
  //           response.data.data.sort((a, b) => b.likeCount - a.likeCount)
  //         );
  //       } catch (err) {
  //         console.log(err);
  //         dispatch(isError(err.response));
  //       }
  //       break;
  //     case '2':
  //       try {
  //         const response = await exceptionAxios.get('/keyboards');
  //         setKeyboards(
  //           response.data.data.sort((a, b) => a.likeCount - b.likeCount)
  //         );
  //       } catch (err) {
  //         console.log(err);
  //         dispatch(isError(err.response));
  //       }
  //       break;
  //     case '3':
  //       setKeyboards((keyboards) =>
  //         [...keyboards].sort((a, b) => b.reviewCount - a.reviewCount)
  //       );
  //       break;
  //     case '4':
  //       setKeyboards((keyboards) =>
  //         [...keyboards].sort((a, b) => a.reviewCount - b.reviewCount)
  //       );
  //       break;
  //     case '5':
  //       setKeyboards((keyboards) =>
  //         [...keyboards].sort((a, b) => b.price - a.price)
  //       );
  //       break;
  //     case '6':
  //       setKeyboards((keyboards) =>
  //         [...keyboards].sort((a, b) => a.price - b.price)
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  // }
  const onChangeBrandCheckbox = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };
  const brandOptions = [
    { label: '로지텍', value: '로지텍' },
    { label: '키크론', value: '키크론' },
    { label: '앱코', value: '앱코' },
    { label: '레오폴드', value: '레오폴드' },
    { label: '바밀로', value: '바밀로' },
  ];

  const onChangeSwitchCheckbox = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };
  const switchOptions = [
    { label: '갈축', value: '갈축' },
    { label: '적축', value: '적축' },
    { label: '청축', value: '청축' },
    { label: '흑축', value: '흑축' },
    { label: '저소음적축', value: '저소음적축' },
  ];

  // const onChangePriceCheckbox = (checkedValues) => {
  //   console.log('checked = ', checkedValues);
  // };
  // const priceOptions = [
  //   { label: '5만원 이하', value: 50000 },
  //   { label: '10만원 이하', value: 100000 },
  //   { label: '15만원 이하', value: 150000 },
  //   { label: '20만원 이하', value: 200000 },
  // ];

  const onChangePriceRadio = (e) => {
    console.log('radio checked', e.target.value);
    setPriceRadio(e.target.value);
  };

  function onChangeTenkey(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  function onChangeBluetooth(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  function onChangeBacklight(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <>
      {!loading && (
        <>
          <div className="keyboard-category">
            <div>브랜드</div>
            <Checkbox.Group
              options={brandOptions}
              // defaultValue={['Pear']}
              onChange={onChangeBrandCheckbox}
            />
            <div>키 스위치</div>
            <Checkbox.Group
              options={switchOptions}
              // defaultValue={['Pear']}
              onChange={onChangeSwitchCheckbox}
            />
            <div>가격</div>
            {/* <Checkbox.Group
              options={priceOptions}
              // defaultValue={['Pear']}
              onChange={onChangePriceCheckbox}
            /> */}
            <Radio.Group onChange={onChangePriceRadio} value={priceRadio}>
              <Radio value={50000}>5만원 이하</Radio>
              <Radio value={100000}>10만원 이하</Radio>
              <Radio value={150000}>15만원 이하</Radio>
              <Radio value={200000}>20만원 이하</Radio>
              {/* <Radio value={1}>
                직접 입력
                {priceRadio === 1 ? (
                  <>
                    <InputNumber style={{ width: 100, marginLeft: 10 }} /> 이하
                  </>
                ) : null} 
              </Radio>*/}
            </Radio.Group>
            <div>기타</div>
            <div>
              <Checkbox onChange={onChangeTenkey}>텐키리스</Checkbox>
              <Checkbox onChange={onChangeBluetooth}>블루투스</Checkbox>
              <Checkbox onChange={onChangeBacklight}>LED 백라이트</Checkbox>
            </div>
          </div>
          <Space
            split={<Divider type="vertical" />}
            style={{ marginBottom: '10px' }}
          >
            <Typography.Link onClick={onClickHeartDescendingBtn}>
              <FaCheck />
              좋아요 많은순
            </Typography.Link>
            <Typography.Link onClick={onClickReviewDescendingBtn}>
              좋아요 적은순
            </Typography.Link>
            <Typography.Link onClick={onClickReviewDescendingBtn}>
              리뷰 많은순
            </Typography.Link>
            <Typography.Link onClick={onClickReviewDescendingBtn}>
              리뷰 적은순
            </Typography.Link>
            <Typography.Link onClick={onClickPriceDescendingBtn}>
              가격 낮은순
            </Typography.Link>
            <Typography.Link onClick={onClickReviewDescendingBtn}>
              가격 높은순
            </Typography.Link>
          </Space>
        </>
      )}
      {/* <Select
        defaultValue="1"
        onChange={handleChange}
        style={{ marginBottom: '30px', minWidth: '150px' }}
      >
        <Option value="1">좋아요 많은순</Option>
        <Option value="2">좋아요 적은순</Option>
        <Option value="3">리뷰 많은순</Option>
        <Option value="4">리뷰 적은순</Option>
        <Option value="5">가격 높은순</Option>
        <Option value="6">가격 낮은순</Option>
      </Select> */}
      <section className="card-section">
        {keyboards.map((keyboard) => (
          <KeyboardCard
            key={`${keyboard.id}_${keyboard.name}`}
            keyboard={keyboard}
          />
        ))}
      </section>
    </>
  );
};

export default Keyboard;
