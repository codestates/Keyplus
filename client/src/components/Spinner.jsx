import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const style = {
  fontSize: 70,
  display: 'flex',
  justifyContent: ' center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
};

const loadingIcon = <LoadingOutlined style={style} spin />;

const Spinner = () => <Spin indicator={loadingIcon} />;

export default Spinner;
