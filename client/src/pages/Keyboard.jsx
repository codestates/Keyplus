import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/customAxios';
import KeyboardCard from './KeyboardCard';

import './Keyboard.scss';
import { isError } from '../reducers/errorReducer';
import { logIn } from '../reducers/api/userAPI';

const Keyboard = () => {
  const dispatch = useDispatch();
  /*
  1. 모든 키보드 정보를 받아온다.
  2. 카드(별도 컴포넌트)에 map 돌려서 정보 넣는다.
  3. 각각의 카드에 props로 정보를 넘겨준다.
  4. 하트를 카드에서 누르면 좋아요 수가 바뀌어야 한다. *****
  5. 각각의 키보드 상세페이지에서도 하트를 누를 수 있다.
  */

  const [keyboards, setKeyboards] = useState([]);

  useEffect(async () => {
    try {
      await dispatch(
        logIn({
          email: 'kimcoding333@github.com',
          password: 'test',
        })
      ).unwrap();
      const response = await axios.get('/keyboards');
      setKeyboards(response.data.data);
    } catch (err) {
      console.log(err);
      dispatch(isError(err.response));
    }
  }, []);

  // useEffect(async () => {
  //   try {
  //     const response = await axios.get('/keyboards');
  //     setKeyboards(response.data.data);
  //   } catch (err) {
  //     dispatch(isError(err.response));
  //   }
  // }, []);

  return (
    <>
      <section className="card-section">
        {keyboards.map((keyboard) => (
          // <Link
          //   key={`${keyboard.id}_${keyboard.name}`}
          //   to={{
          //     pathname: `/keyboards/${keyboard.id}`,
          //     state: { keyboard },
          //   }}
          // >
          <KeyboardCard
            key={`${keyboard.id}_${keyboard.name}`}
            keyboard={keyboard}
            // onClick={ }
          />
          // </Link>
        ))}
      </section>
    </>
  );
};

export default Keyboard;
