import React from 'react';

import { Header } from './Header';
import { Footer } from './Footer';

const Main = () => {
  return <></>;
};

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {/* <Main>{children}</Main> */}
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
