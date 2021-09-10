import React from 'react';
import { ReactComponent as KEYPLUS } from '../assets/KEYPLUS_white_24.svg';

import './Header.css';

export const Header = () => {
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

      <nav className="navbar">
        <div className="navbar-container">
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="http://localhost:3000/keyboard" className="nav-links">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-links">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-links">Products</a>
            </li>

            <li>
              <a className="nav-links-mobile">Sign Up</a>
            </li>
          </ul>
          <a className="navbar-logo">
            <KEYPLUS />
          </a>
          {<button>SIGN UP</button>}
        </div>
      </nav>
    </>
  );
};
