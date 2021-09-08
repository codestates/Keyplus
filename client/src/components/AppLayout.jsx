import React from 'react';

const Header = () => {
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
    </>
  );
};
const Main = () => {
  return <></>;
};
const Footer = () => {
  return (
    <>
      {/* 왼쪽: 로고 회색깔로 넣기 */}
      {/* 오른쪽: 문의: 1:1문의 */}
      {/* 오른쪽: 서비스 소개: REPOSITORY & WIKI*/}
      {/* 오른쪽: Team Members: 정선아, 김민성, 백승문, 박준호 */}
    </>
  );
};

const AppLayout = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      {/* <Main>{children}</Main> */}
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default AppLayout;
