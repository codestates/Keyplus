import React from 'react';

import Header from './Header';
import Footer from './Footer';
import './Main.scss';

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {/* <Main>{children}</Main> */}
      {/* 100뷰포트에서 70px을 뺀 하이트 이게 컨텐츠의 최소값이다. */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
