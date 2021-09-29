import React from 'react';

import Header from './Header';
import Footer from './Footer';

import './styles/Main.scss';

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
