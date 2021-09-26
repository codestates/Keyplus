import React, { useEffect, useState } from 'react';
import { ReactComponent as KEYPLUS_WHITE_36 } from '../assets/images/KEYPLUS_white_36.svg';
import { ReactComponent as KEYPLUS_BLACK_36 } from '../assets/images/KEYPLUS_black_36.svg';
import { ReactComponent as KEYPLUS_WHITE_24 } from '../assets/images/KEYPLUS_white_24.svg';
import { ReactComponent as KEYPLUS_BLACK_24 } from '../assets/images/KEYPLUS_black_24.svg';

import {
  UserOutlined,
  CloseOutlined,
  MenuOutlined,
  ExportOutlined,
} from '@ant-design/icons';

import './LandingHeader.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducers/api/userAPI';
import { isError } from '../reducers/errorReducer';
import { useHistory } from 'react-router';

const LandingHeader = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.user);

  const onClickToggleBtn = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  //FIXME: 로그아웃 함수
  const onClickLogout = async () => {
    console.log('로그아웃 버튼 클릭됬어?');
    console.log(`여기가 유저스테이트`, userState);
    try {
      //유저정보가 있으면 (=로그인 되있으면) 로그아웃 시키고 랜딩페이지로 이동
      await dispatch(logOut(history)).unwrap();
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  //FIXME: Mypage 함수
  const onClickMypage = async () => {
    console.log('마이페이지 버튼 클릭됬어?');
    try {
      if (userState === null) {
        //로그인 되지 않은 상태라면 로그인 페이지로 이동시킴
        history.push('/login');
      } else {
        //유저정보가 있으면 (=로그인 되있으면) 마이페이지로 이동
        history.push('/mypage');
      }
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  useEffect(() => {
    window.onscroll = () => {
      if (offset === 0 && window.pageYOffset > 0) setOffset(1);
      else if (window.pageYOffset === 0) setOffset(0);
    };
  }, [offset]);

  useEffect(() => {
    window.onresize = () => {
      if (width <= 768 && window.innerWidth > 768) setWidth(769);
      else if (width > 768 && window.innerWidth <= 768) setWidth(768);
    };
  }, [width]);

  return (
    <>
      <header
        className={
          offset > 0 ? 'landing-header' : 'landing-header landing-bgc-white'
        }
      >
        <nav className="landing-navigation">
          <div className="landing-menu-icon" onClick={onClickToggleBtn}>
            {isOpenSidebar ? (
              <CloseOutlined
                style={{
                  fontSize: '24px',
                  color: '#fff',
                }}
              />
            ) : (
              <MenuOutlined
                style={{
                  fontSize: '24px',
                  color: '#fff',
                }}
              />
            )}
          </div>

          <ul
            className={
              isOpenSidebar
                ? offset > 0
                  ? 'landing-nav-menu active'
                  : 'landing-nav-menu active landing-bgc-white'
                : 'nav-menu'
            }
          >
            <div
              className={
                isOpenSidebar
                  ? 'landing-nav-item-wrapper active'
                  : 'landing-nav-item-wrapper'
              }
            >
              <li className="landing-nav-item">
                <Link
                  to="/"
                  className="landing-nav-links"
                  onClick={onClickToggleBtn}
                >
                  설문조사
                </Link>
              </li>
              <li className="landing-nav-item">
                <Link
                  to="/keyboards"
                  className="landing-nav-links"
                  onClick={onClickToggleBtn}
                >
                  키보드
                </Link>
              </li>
              <li className="landing-nav-item">
                <Link
                  to="/map"
                  className="landing-nav-links"
                  onClick={onClickToggleBtn}
                >
                  타건샵
                </Link>
              </li>
            </div>
          </ul>
        </nav>
        <Link to="/" className="landing-header-logo">
          {width > 768 ? (
            offset > 0 ? (
              <KEYPLUS_WHITE_36 />
            ) : (
              <KEYPLUS_WHITE_36 />
            )
          ) : offset > 0 ? (
            <KEYPLUS_WHITE_24 />
          ) : (
            <KEYPLUS_WHITE_24 />
          )}
        </Link>
        <nav className="landing-buttons">
          <ul className="landing-button-menu">
            <li className="landing-button-item">
              <button onClick={onClickMypage} className="landing-button-links">
                <UserOutlined
                  style={{
                    fontSize: '24px',
                    color: '#fff',
                  }}
                />
              </button>
            </li>
            {userState !== null && (
              <li className="button-item">
                <button
                  onClick={onClickLogout}
                  className="landing-button-links"
                >
                  <ExportOutlined
                    style={{
                      fontSize: '24px',
                      color: '#fff',
                    }}
                  />
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default LandingHeader;
