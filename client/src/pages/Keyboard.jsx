import React, { useEffect, useRef, useState, useCallback } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import axios from 'axios';
import KeyboardCard from '../components/KeyboardCard';
import 'antd/dist/antd.css';
import { Select, Space, Typography, Divider, Checkbox, Radio } from 'antd';
import { FaCheck } from 'react-icons/fa';
import { FiRotateCw } from 'react-icons/fi';
import ScrollArrow from '../components/ScrollArrow';
import './styles/Keyboard.scss';
import KeyboardCardSkeleton from '../components/KeyboardCardSkeleton';
const { Option } = Select;

import { useSelector } from 'react-redux';

import produce from 'immer';

const brandList = [
  '로지텍',
  '키크론',
  '앱코',
  '레오폴드',
  '바밀로',
  '한성',
  '콕스',
  '엠스톤',
  '체리',
  '커세어',
];

const switchList = ['갈축', '적축', '청축', '흑축', '저소음적축'];

const priceList = ['50000', '100000', '150000', '200000', '300000'];

const sortingList = [
  '좋아요 많은순',
  '좋아요 적은순',
  '리뷰 많은순',
  '리뷰 적은순',
  '가격 낮은순',
  '가격 높은순',
];

const Keyboard = () => {
  console.log('render');

  const [loading, setLoading] = useState(true);

  const [keyboards, setKeyboards] = useState([]);
  const [allKeyboards, setAllKeyboards] = useState([]);

  const [sortingNumber, setSortingNumber] = useState(1);
  const [allCategory, setAllCategory] = useState([]);

  const [brands, setBrands] = useState([]);
  const [switches, setSwitches] = useState([]);
  const [priceRadio, setPriceRadio] = useState(null);

  const [tenkeyLess, setTenkeyLess] = useState(false);
  const [bluetooth, setBluetooth] = useState(false);
  const [backlight, setBacklight] = useState(false);

  const width = useSelector((state) => state.window.width);
  const isFetched = useRef(false);

  const addLike = useCallback((id) => {
    setKeyboards(
      produce((draft) => {
        const index = draft.findIndex((keyboard) => keyboard.id === id);
        if (index !== -1) draft[index].likeCount += 1;
      })
    );
  });

  const deleteLike = useCallback((id) => {
    setKeyboards(
      produce((draft) => {
        const index = draft.findIndex((keyboard) => keyboard.id === id);
        if (index !== -1) draft[index].likeCount -= 1;
      })
    );
  });

  // * ------------------ useEffect
  // ! 맨 처음 데이터 fetch용 useEffect
  useEffect(() => {
    console.log('맨 처음 데이터 fetch용 useEffect');
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get('/keyboards');
        const sortedData = response.data.data.sort(
          (a, b) => b.likeCount - a.likeCount
        );

        if (isMounted) {
          unstable_batchedUpdates(() => {
            setKeyboards(sortedData);
            console.log('setKeyboards 후');
            setAllKeyboards(sortedData);
            console.log('setAllKeyboards 후');
            setLoading(false);
            console.log('setLoading=false 후');
          });
          isFetched.current = true;
        }
      } catch (err) {
        throw err;
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ! 필터링용 useEffect
  useEffect(() => {
    if (isFetched.current) {
      console.log('필터링용 useEffect');

      // * 초기화
      setKeyboards([...allKeyboards]);

      // * 브랜드
      if (brands.length !== 0) {
        setKeyboards((prev) =>
          prev.filter((keyboard) => brands.indexOf(keyboard.brand) !== -1)
        );
      }
      // * 스위치
      if (switches.length !== 0) {
        setKeyboards((prev) =>
          prev.filter((keyboard) => {
            for (let i = 0; i < switches.length; i++) {
              if (keyboard.switch[switches[i]]) return true;
            }
            return false;
          })
        );
      }

      // * 가격
      if (priceRadio) {
        setKeyboards((prev) =>
          prev.filter((keyboard) => keyboard.price <= Number(priceRadio))
        );
      }

      if (tenkeyLess) {
        setKeyboards((prev) => prev.filter((keyboard) => !keyboard.tenkey));
      }
      if (bluetooth) {
        setKeyboards((prev) => prev.filter((keyboard) => keyboard.bluetooth));
      }
      if (backlight) {
        setKeyboards((prev) => prev.filter((keyboard) => keyboard.backlight));
      }
    }
  }, [brands, switches, priceRadio, tenkeyLess, bluetooth, backlight]);

  // ! 정렬용 useEffect
  useEffect(() => {
    if (isFetched.current) {
      console.log('정렬용 useEffect');
      switch (sortingNumber) {
        case 1:
          setAllKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => b.likeCount - a.likeCount)
          );
          setKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => b.likeCount - a.likeCount)
          );
          break;
        case 2:
          setAllKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => a.likeCount - b.likeCount)
          );
          setKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => a.likeCount - b.likeCount)
          );
          break;
        case 3:
          setAllKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => b.reviewCount - a.reviewCount)
          );
          setKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => b.reviewCount - a.reviewCount)
          );
          break;
        case 4:
          setAllKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => a.reviewCount - b.reviewCount)
          );
          setKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => a.reviewCount - b.reviewCount)
          );
          break;
        case 5:
          setAllKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => a.price - b.price)
          );
          setKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => a.price - b.price)
          );
          break;
        case 6:
          setAllKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => b.price - a.price)
          );
          setKeyboards((keyboards) =>
            [...keyboards].sort((a, b) => b.price - a.price)
          );
          break;
        default:
          break;
      }
    }
  }, [sortingNumber]);

  // * ------------------ 필터링, 정렬, 리셋
  // ! 브랜드
  const onChangeBrand = useCallback((e) => {
    if (e.target.checked) {
      setBrands((prev) => [...prev, e.target.name]);
      setAllCategory((prev) => [...prev, e.target.name]);
    } else {
      setBrands((prev) => prev.filter((brand) => brand !== e.target.name));
      setAllCategory((prev) =>
        prev.filter((category) => category !== e.target.name)
      );
    }
  }, []);

  const checkBrand = useCallback((brand) => brands.includes(brand), [brands]);

  // ! 스위치
  const onChangeSwitch = useCallback((e) => {
    if (e.target.checked) {
      setSwitches((prev) => [...prev, e.target.name]);
      setAllCategory((prev) => [...prev, e.target.name]);
    } else {
      setSwitches((prev) =>
        prev.filter((keySwitch) => keySwitch !== e.target.name)
      );
      setAllCategory((prev) =>
        prev.filter((category) => category !== e.target.name)
      );
    }
  }, []);

  const checkSwitch = useCallback(
    (keySwitch) => switches.includes(keySwitch),
    [switches]
  );

  // ! 가격
  const onChangePriceRadio = useCallback((e) => {
    setAllCategory((prev) =>
      prev.filter((category) => !category.endsWith('이하'))
    );
    setPriceRadio(e.target.value);
    setAllCategory((prev) => [
      ...prev,
      e.target.value.replace(/0{4}$/, '') + `만원 이하`,
    ]);
  }, []);

  const onClickPriceRadio = (e) => {
    console.log('온클릭프라이스라디오');
    if (e.target.checked) {
      e.target.checked = false;
      setPriceRadio(null);
      setAllCategory((prev) =>
        prev.filter((category) => !category.endsWith('이하'))
      );
    } else {
      setPriceRadio(e.target.value);
    }
  };

  // ! 텐키
  const onChangeTenkeyLess = useCallback((e) => {
    setTenkeyLess(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '텐키리스']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '텐키리스')
      );
    }
  }, []);

  // ! 블루투스
  const onChangeBluetooth = useCallback((e) => {
    setBluetooth(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, '블루투스']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== '블루투스')
      );
    }
  }, []);

  // ! 백라이트
  const onChangeBacklight = useCallback((e) => {
    setBacklight(e.target.checked);
    if (e.target.checked) {
      setAllCategory((prev) => [...prev, 'LED백라이트']);
    } else {
      setAllCategory((prev) =>
        prev.filter((category) => category !== 'LED백라이트')
      );
    }
  }, []);

  // ! 정렬
  const onChangeSortingNumber = useCallback((value) => {
    setSortingNumber(value);
  }, []);

  // ! reset 버튼 클릭
  const onClickResetBtn = useCallback(() => {
    setAllCategory([]);

    setBrands([]);
    setSwitches([]);
    setPriceRadio(null);

    setTenkeyLess(false);
    setBluetooth(false);
    setBacklight(false);
  }, []);

  return (
    <>
      <ScrollArrow />
      <div className="keyboard">
        <div className="keyboard-category">
          <div>브랜드</div>
          <div className="category-list horizontal-scroll">
            {brandList.map((brand, idx) => (
              <Checkbox
                key={idx}
                name={brand}
                checked={checkBrand(brand)}
                onChange={onChangeBrand}
              >
                {brand}
              </Checkbox>
            ))}
          </div>
          <div>키 스위치</div>
          <div className="category-list horizontal-scroll">
            {switchList.map((keySwitch, idx) => (
              <Checkbox
                key={idx}
                name={keySwitch}
                checked={checkSwitch(keySwitch)}
                onChange={onChangeSwitch}
              >
                {keySwitch}
              </Checkbox>
            ))}
          </div>
          <div>가격</div>
          <Radio.Group
            onChange={onChangePriceRadio}
            value={priceRadio}
            className="category-list horizontal-scroll radio-group"
          >
            {priceList.map((price, idx) => (
              <Radio key={idx} value={price} onClick={onClickPriceRadio}>
                {price.replace(/0{4}$/, '')}만원 이하
              </Radio>
            ))}
          </Radio.Group>
          <div>기타</div>
          <div className="category-list horizontal-scroll">
            <Checkbox checked={tenkeyLess} onChange={onChangeTenkeyLess}>
              텐키리스
            </Checkbox>
            <Checkbox checked={bluetooth} onChange={onChangeBluetooth}>
              블루투스
            </Checkbox>
            <Checkbox checked={backlight} onChange={onChangeBacklight}>
              LED백라이트
            </Checkbox>
          </div>
          {allCategory.length !== 0 && (
            <>
              <div className="clear-button-wrapper">
                <button onClick={onClickResetBtn}>
                  <FiRotateCw />
                  <span>전체 해제</span>
                </button>
              </div>
              <div className="selected-category-wrapper">
                {allCategory.map((category) => (
                  <div key={category} className="selected-category">
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="keyboard-sorting-count-area">
          {width >= 768 ? (
            <Space
              split={<Divider type="vertical" />}
              style={{ columnGap: '6px !important' }}
              className="horizontal-scroll"
            >
              {sortingList.map((sorting, idx) => (
                <Typography.Link
                  key={idx}
                  className={`sorting-tab ${
                    sortingNumber === idx + 1 && 'selected'
                  }`}
                  onClick={() => onChangeSortingNumber(idx + 1)}
                >
                  <span style={{ marginRight: '5px' }}>
                    {sortingNumber === idx + 1 && <FaCheck />}
                  </span>
                  {sorting}
                </Typography.Link>
              ))}
            </Space>
          ) : (
            <Select
              defaultValue={sortingNumber}
              onChange={onChangeSortingNumber}
            >
              {sortingList.map((sorting, idx) => (
                <Option key={idx} value={idx + 1}>
                  {sorting}
                </Option>
              ))}
            </Select>
          )}
          <div className="keyboard-count">총 {keyboards.length}개</div>
        </div>
        <section className="card-section">
          {loading
            ? Array(20)
                .fill(1)
                .map((_, i) => <KeyboardCardSkeleton key={i} />)
            : keyboards.map((keyboard) => (
                <KeyboardCard
                  key={`${keyboard.id}_${keyboard.name}`}
                  keyboard={keyboard}
                  addLike={addLike}
                  deleteLike={deleteLike}
                />
              ))}
        </section>
      </div>
    </>
  );
};

export default Keyboard;
