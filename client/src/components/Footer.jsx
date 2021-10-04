import React from 'react';
import { ReactComponent as KEYPLUS } from '../assets/images/KEYPLUS_footer_36.svg';
import './styles/Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col">
              <KEYPLUS />
            </div>
            <div className="footer-col">
              <h4>문의하기</h4>
              <Link to="/inquiry">1:1 문의하기</Link>
            </div>
            <div className="footer-col">
              <h4>서비스 소개</h4>
              <ul>
                <li>
                  <a
                    href="https://github.com/codestates/Keyplus"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repository
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/codestates/Keyplus/wiki"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WIKI
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Team Members</h4>
              <ul>
                <li>
                  <a
                    href="https://github.com/seona-jung"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    정선아
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/chloemk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    김민성
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/do8972"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    박준호
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/goodbsm2421"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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

export default Footer;
