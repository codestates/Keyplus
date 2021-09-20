import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const style = {
  fontSize: 70,
  display: 'flex',
  justifyContent: ' center',
  alignItems: 'center',
  height: '100vh',
};
const loading = <LoadingOutlined style={style} spin />;

const Spinner = () => <Spin indicator={loading} />;

export default Spinner;
