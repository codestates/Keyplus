import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardCard from '../components/KeyboardCard';
import Review from '../components/Review';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import '../pages/styles/Mypage.scss';

const Tab = ({ reviewInfo, likesInfo, userId }) => {
  return (
    <div className="mypage-tabs">
      <Tabs defaultActiveKey="1">
        <TabPane tab="관심 키보드" key="관심 키보드">
          {likesInfo.length !== 0 &&
            likesInfo.map((keyboard) => (
              <div
                key={`${keyboard.id}_${keyboard.name}`}
                className="mypage-tab-item"
              >
                <KeyboardCard keyboard={keyboard} />
              </div>
            ))}
        </TabPane>

        <TabPane tab="내 리뷰" key="내 리뷰">
          {reviewInfo.length !== 0 &&
            reviewInfo.map((review, idx) => (
              <Link
                key={`${review}_${idx}`}
                to={`/keyboards/${review.keyboardId}`}
              >
                <div className="mypage-tab-item mypage-review">
                  <Review review={review} userId={userId} />
                </div>
              </Link>
            ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Tab;
