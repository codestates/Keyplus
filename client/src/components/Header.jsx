import React, { useEffect, useState } from 'react';
import { ReactComponent as KEYPLUS_WHITE } from '../assets/images/KEYPLUS_white_24.svg';
import { ReactComponent as KEYPLUS_BLACK } from '../assets/images/KEYPLUS_black_24.svg';

import { AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import { IoMdExit } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';

import './Header.scss';

export const Header = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [offset, setOffset] = useState(0);

  const onClickToggleBtn = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    window.onscroll = () => {
      if (offset === 0 && window.pageYOffset > 0) setOffset(1);
      else if (window.pageYOffset === 0) setOffset(0);
    };
  }, [offset]);

  return (
    <>
      {/* 헤더는 sticky로 스크롤해도 고정한다. */}
      {/* 키보드, 타건샵 메뉴 왼쪽 위치 */}
      {/* 스크롤 애니메이션 (PAFFEM)처럼 스크롤하다가 헤더에서 메인으로 내려오는 순간 헤더 색 변경 */}
      {/* 반응형으로 왼쪽에 햄버거 애니메이션 (PAFFEM) */}
      {/* Logo 중간 */}
      {/* isLogin이 false면 오른쪽에 사람 아이콘 하나 */}
      {/* isLogin이 true면 사람 아이콘 + 나가기 아이콘 */}
      {/* isLogin이 true면 사람아이콘 클릭 시, 마이페이지 & false일 경우엔 로그인 페이지로 이동 */}

      <header className={offset > 0 ? 'header' : 'header bgc-white'}>
        <nav className="navigation">
          <div className="menu-icon" onClick={onClickToggleBtn}>
            {isOpenSidebar ? (
              <AiOutlineClose size={24} fill={offset > 0 ? '#fff' : '#000'} />
            ) : (
              <GiHamburgerMenu size={24} fill={offset > 0 ? '#fff' : '#000'} />
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
            {/* <ul className="nav-menu"> */}
            <li className="nav-item">
              <a href="#" className="nav-links">
                설문조사
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-links">
                키보드
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-links">
                타건샵
              </a>
            </li>
          </ul>
        </nav>
        <a className="header-logo">
          {offset > 0 ? <KEYPLUS_WHITE /> : <KEYPLUS_BLACK />}
        </a>
        <nav className="buttons">
          <ul className="button-menu">
            <li className="button-item">
              <a href="#" className="button-links">
                <AiOutlineUser size={24} fill={offset > 0 ? '#fff' : '#000'} />
              </a>
            </li>
            <li className="button-item">
              <a href="#" className="button-links">
                <IoMdExit size={24} fill={offset > 0 ? '#fff' : '#000'} />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
