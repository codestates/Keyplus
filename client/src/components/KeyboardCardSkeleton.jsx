import React from 'react';
import { Card } from 'antd';

import './styles/KeyboardCardSkeleton.scss';

const KeyboardCardSkeleton = () => {
  return (
    <div className="keyboard-card-skeleton-container">
      <Card
        loading={true}
        className="keyboard-skeleton-card"
        cover={<div className="keyboard-skeleton-img" />}
      />
    </div>
  );
};

export default KeyboardCardSkeleton;
