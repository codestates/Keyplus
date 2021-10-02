import React from 'react';
import { useSelector } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import Spinner from '../components/Spinner';

import './styles/Main.scss';

const AppLayout = ({ children }) => {
  const loading = useSelector((state) => state.loading);
  return (
    <>
      {loading && <Spinner />}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
