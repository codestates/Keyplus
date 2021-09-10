import React from 'react';
import { ReactComponent as KEYPLUS } from '../assets/images/KEYPLUS_footer_48.svg';
import './Footer.scss';

export const Footer = () => {
  return (
    <>
      {/* 왼쪽: 로고 회색깔로 넣기 */}
      {/* 오른쪽: 문의: 1:1문의 */}
      {/* 오른쪽: 서비스 소개: REPOSITORY & WIKI*/}
      {/* 오른쪽: Team Members: 정선아, 김민성, 백승문, 박준호 */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <KEYPLUS />
            </div>
            <div className="footer-col">
              <h4>문의하기</h4>
              <a href="#" target="_blank" rel="noreferrer">
                1:1 문의하기
              </a>
            </div>
            <div className="footer-col">
              <h4>서비스 소개</h4>
              <ul>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    Repository
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    WIKI
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Team Members</h4>
              <ul>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    정선아
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    김민성
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    박준호
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    백승문
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
