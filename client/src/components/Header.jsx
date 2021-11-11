import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducers/api/userAPI';
import usePageYOffset from '../hooks/usePageYOffset';
import './styles/Header.scss';
import { ReactComponent as KEYPLUS_WHITE_36 } from '../assets/images/KEYPLUS_white_36.svg';
import { ReactComponent as KEYPLUS_BLACK_36 } from '../assets/images/KEYPLUS_black_36.svg';
import { ReactComponent as KEYPLUS_WHITE_24 } from '../assets/images/KEYPLUS_white_24.svg';
import { ReactComponent as KEYPLUS_BLACK_24 } from '../assets/images/KEYPLUS_black_24.svg';
import { message } from 'antd';
import {
  UserOutlined,
  CloseOutlined,
  MenuOutlined,
  ExportOutlined,
} from '@ant-design/icons';

import classNames from 'classnames';

const Header = ({ landing }) => {
  const width = useSelector((state) => state.window.width);
  const offset = usePageYOffset();
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
      message.success('로그아웃이 완료되었습니다');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const onClickMyPage = () => {
    if (userState) {
      history.push('/mypage');
      setIsOpenSidebar(false);
    } else {
      history.push('/login');
      setIsOpenSidebar(false);
    }
  };

  return (
    <>
      <header
        className={classNames('header', { 'bgc-white': !offset }, { landing })}
      >
        <nav className="navigation">
          <div className="menu-icons" onClick={onClickToggleBtn}>
            {isOpenSidebar ? (
              <CloseOutlined
                style={{ fontSize: width >= 768 ? '24px' : '22px' }}
                className={classNames(
                  'menu-icon',
                  { black: !offset },
                  { landing }
                )}
              />
            ) : (
              <MenuOutlined
                style={{ fontSize: width >= 768 ? '24px' : '22px' }}
                className={classNames(
                  'menu-icon',
                  { black: !offset },
                  { landing }
                )}
              />
            )}
          </div>

          <ul
            className={classNames(
              'nav-menu',
              { active: isOpenSidebar },
              { 'bgc-white': offset <= 0 },
              { landing }
            )}
          >
            <div
              className={
                isOpenSidebar ? 'nav-item-wrapper active' : 'nav-item-wrapper'
              }
            >
              <li className="nav-item">
                <Link
                  to="/survey"
                  className="nav-links"
                  onClick={isOpenSidebar ? onClickToggleBtn : null}
                >
                  설문조사
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/keyboards"
                  className="nav-links"
                  onClick={isOpenSidebar ? onClickToggleBtn : null}
                >
                  키보드
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/typing-shop"
                  className="nav-links"
                  onClick={isOpenSidebar ? onClickToggleBtn : null}
                >
                  타건샵
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/introduction"
                  className="nav-links"
                  onClick={isOpenSidebar ? onClickToggleBtn : null}
                >
                  입문
                </Link>
              </li>
            </div>
          </ul>
        </nav>
        <Link to="/" className="header-logo">
          {width >= 768 ? (
            landing ? (
              <KEYPLUS_WHITE_36 />
            ) : offset > 0 ? (
              <KEYPLUS_WHITE_36 />
            ) : (
              <KEYPLUS_BLACK_36 />
            )
          ) : landing ? (
            <KEYPLUS_WHITE_24 />
          ) : offset > 0 ? (
            <KEYPLUS_WHITE_24 />
          ) : (
            <KEYPLUS_BLACK_24 />
          )}
        </Link>
        <nav className="buttons">
          <ul className="button-menu">
            <li className="button-item">
              <button onClick={onClickMyPage} className="button-links">
                <UserOutlined
                  style={{ fontSize: width >= 768 ? '24px' : '22px' }}
                  className={classNames(
                    'menu-icon',
                    { black: !offset },
                    { landing }
                  )}
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
                    style={{ fontSize: width >= 768 ? '24px' : '22px' }}
                    className={classNames(
                      'menu-icon',
                      { black: !offset },
                      { landing }
                    )}
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
