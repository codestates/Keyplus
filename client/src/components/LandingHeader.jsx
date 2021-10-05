import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducers/api/userAPI';
import useWidthSize from '../hooks/useWidthSize';
import usePageYOffset from '../hooks/usePageYOffset';
import './styles/LandingHeader.scss';
import { ReactComponent as KEYPLUS_WHITE_36 } from '../assets/images/KEYPLUS_white_36.svg';
import { ReactComponent as KEYPLUS_WHITE_24 } from '../assets/images/KEYPLUS_white_24.svg';
import { message } from 'antd';
import {
  UserOutlined,
  CloseOutlined,
  MenuOutlined,
  ExportOutlined,
} from '@ant-design/icons';

const LandingHeader = () => {
  const offset = usePageYOffset();
  const width = useWidthSize(768);
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
      message.success('로그아웃이 완료되었습니다');
    } catch (err) {
      return message.success('로그아웃이 완료되었습니다');
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
      throw err;
    }
  };

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
                  fontSize: width > 768 ? '24px' : '22px',
                  color: '#fff',
                }}
              />
            ) : (
              <MenuOutlined
                style={{
                  fontSize: width > 768 ? '24px' : '22px',
                  color: '#fff',
                }}
              />
            )}
          </div>

          <ul
            className={isOpenSidebar ? 'landing-nav-menu active' : 'nav-menu'}
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
                  to="/survey"
                  className="landing-nav-links"
                  onClick={isOpenSidebar ? onClickToggleBtn : null}
                >
                  설문조사
                </Link>
              </li>
              <li className="landing-nav-item">
                <Link
                  to="/keyboards"
                  className="landing-nav-links"
                  onClick={isOpenSidebar ? onClickToggleBtn : null}
                >
                  키보드
                </Link>
              </li>
              <li className="landing-nav-item">
                <Link
                  to="/typing-shop"
                  className="landing-nav-links"
                  onClick={isOpenSidebar ? onClickToggleBtn : null}
                >
                  타건샵
                </Link>
              </li>
              <li className="landing-nav-item">
                <Link
                  to="/introduction"
                  className="landing-nav-links"
                  onClick={isOpenSidebar ? onClickToggleBtn : null}
                >
                  입문
                </Link>
              </li>
            </div>
          </ul>
        </nav>
        <Link to="/" className="landing-header-logo">
          {width > 768 ? <KEYPLUS_WHITE_36 /> : <KEYPLUS_WHITE_24 />}
        </Link>
        <nav className="landing-buttons">
          <ul className="landing-button-menu">
            <li className="landing-button-item">
              <button onClick={onClickMypage} className="landing-button-links">
                <UserOutlined
                  style={{
                    fontSize: width > 768 ? '24px' : '22px',
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
                      fontSize: width > 768 ? '24px' : '22px',
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
