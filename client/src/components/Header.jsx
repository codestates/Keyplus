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

import './styles/Header.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducers/api/userAPI';
import { isError } from '../reducers/errorReducer';
import { useHistory } from 'react-router';
import useWidthSize from '../hooks/useWidthSize';
import usePageYOffset from '../hooks/usePageYOffset';

const Header = () => {
  const offset = usePageYOffset();
  const width = useWidthSize();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.user);

  const onClickToggleBtn = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  const onClickLogout = async () => {
    try {
      await dispatch(logOut(history)).unwrap();
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  const onClickMypage = async () => {
    try {
      if (userState === null) {
        history.push('/login');
      } else {
        history.push('/mypage');
      }
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  return (
    <>
      <header className={offset > 0 ? 'header' : 'header bgc-white'}>
        <nav className="navigation">
          <div className="menu-icon" onClick={onClickToggleBtn}>
            {isOpenSidebar ? (
              <CloseOutlined
                style={{
                  fontSize: '24px',
                  color: offset > 0 ? '#fff' : '#000',
                }}
              />
            ) : (
              <MenuOutlined
                style={{
                  fontSize: '24px',
                  color: offset > 0 ? '#fff' : '#000',
                }}
              />
            )}
          </div>

          <ul
            className={
              isOpenSidebar
                ? offset > 0
                  ? 'nav-menu active'
                  : 'nav-menu active bgc-white'
                : 'nav-menu'
            }
          >
            <div
              className={
                isOpenSidebar ? 'nav-item-wrapper active' : 'nav-item-wrapper'
              }
            >
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-links"
                  onClick={isOpenSidebar && onClickToggleBtn}
                >
                  설문조사
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/keyboards"
                  className="nav-links"
                  onClick={isOpenSidebar && onClickToggleBtn}
                >
                  키보드
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/map"
                  className="nav-links"
                  onClick={isOpenSidebar && onClickToggleBtn}
                >
                  타건샵
                </Link>
              </li>
            </div>
          </ul>
        </nav>
        <Link to="/" className="header-logo">
          {width > 768 ? (
            offset > 0 ? (
              <KEYPLUS_WHITE_36 />
            ) : (
              <KEYPLUS_BLACK_36 />
            )
          ) : offset > 0 ? (
            <KEYPLUS_WHITE_24 />
          ) : (
            <KEYPLUS_BLACK_24 />
          )}
        </Link>
        <nav className="buttons">
          <ul className="button-menu">
            <li className="button-item">
              <button onClick={onClickMypage} className="button-links">
                <UserOutlined
                  style={{
                    fontSize: '24px',
                    color: offset > 0 ? '#fff' : '#000',
                  }}
                />
              </button>
            </li>
            {userState !== null && (
              <li className="button-item">
                <button onClick={onClickLogout} className="button-links">
                  <ExportOutlined
                    style={{
                      fontSize: '24px',
                      color: offset > 0 ? '#fff' : '#000',
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

export default Header;
