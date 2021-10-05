import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import Header from '../components/Header';
import useWidthSize from '../hooks/useWidthSize';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaExclamation } from 'react-icons/fa';
import useIsMount from '../hooks/useIsMount';
import './styles/Introduction.scss';

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const Introduction = () => {
  const width = useWidthSize(768);
  const isMount = useIsMount();
  const [underlineYellow, setUnderlineYellow] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setUnderlineYellow('underline-yellow');
    await delay();
    setIsLoading(false);
  }, [isMount]);

  return (
    <>
      <Header />
      <section className="intro-container">
        <div className="intro-title">
          <h1 className={`intro-big-title underline ${underlineYellow}`}>
            <span>
              <strong>기계식 키보드</strong> 입문 완벽 가이드
            </span>
            <FaExclamation style={{ color: '#ff0000' }} />
          </h1>
        </div>
        {!isLoading && (
          <div className="intro-contentsBx">
            <div className="intro-contents">
              <p className="intro-p strong">
                <span className="bgc-gray">
                  기계식 키보드가 처음이신가요? <br /> 본 페이지는 기계식
                  키보드의 가장 기본인{width > 768 ? ` ` : <br />}
                  <strong> 스위치</strong>를 소개하고 있습니다.
                </span>
              </p>
              <p className="intro-p">
                설명을 보시기 전에 소리부터 먼저 들어보세요!
              </p>
              <ReactPlayer
                playsinline={true}
                style={{
                  maxWidth: '100%',
                  margin: '0 auto',
                  marginBottom: '20px',
                }}
                url="https://youtu.be/p4_xm5Ib-OE"
              />
              <div className="intro-p">
                <div>어떤 스위치의 소리가 가장 마음에 드시나요?</div>
                <div>
                  아직 정하지 못했어도 괜찮습니다.{width > 768 ? ` ` : <br />}
                  아래 설명을 보면서 마음에 드는 스위치를 찾아보세요!
                </div>
              </div>
              <article>
                <h2 className="intro-title-s">Click(청축)</h2>
                <div className="p-grid">
                  <img src="/info/info3.png" />
                  <div>
                    <p>
                      클릭 타입은 타건감이 강하고, 찰칵찰칵 소리가 큰 것이
                      특징입니다. 클릭키 스위치들은 키압이 높고, 경쾌한 느낌과
                      걸리는 느낌을 줍니다.
                    </p>
                    <p>
                      클릭키를 사용하는 대표적인 축으로는 <strong>청축</strong>,{' '}
                      <strong>녹축</strong> 그리고
                      <strong>백축</strong>이 있습니다. 확실한 키감과 경쾌한
                      소리의 기계식 키보드를 원하거나, 게임용으로 사용을 원하는
                      경우라면 적합한 스위치입니다.
                    </p>
                  </div>
                </div>
              </article>
              <article>
                <h2 className="intro-title-s">Tactile(갈축)</h2>
                <div className="p-grid">
                  <div>
                    <p>
                      택타일은 넌클릭 타입이라고도 하며, 클릭 타입에 비해 소음이
                      작습니다. 미세한 걸림이 있어 뒤에서 소개할 리니어 타입보다
                      타건감이 뚜렷합니다.
                    </p>
                    <p>
                      대표적인 축으로는
                      <strong>갈축</strong>, <strong>회축</strong> 그리고
                      <strong>클리어축</strong>이 있습니다. 걸림은 있지만 소음이
                      적은 기계식 키보드를 원하는 경우에 적합한 스위치입니다.
                    </p>
                  </div>
                  <img src="/info/info4.png" />
                </div>
              </article>
              <article>
                <h2 className="intro-title-s">Linear(적축)</h2>
                <div className="p-grid">
                  <img src="/info/info5.png" />
                  <div>
                    <p>
                      리니어는 구조상 소음이 가장 적습니다. 기계적인 느낌이 가장
                      낮으며 걸림이 없습니다. 키압이 낮아 부드러운 타건이
                      가능하며 장시간 사용 시 피로도가 낮습니다.
                    </p>
                    <p>
                      대표적인 축으로는
                      <strong>적축</strong>, <strong>흑축</strong>,
                      <strong>저소음 적축</strong>, <strong>저소음 흑축</strong>
                      ,<strong>스피드 은축</strong>
                      그리고 <strong>진회축</strong>이 있습니다. 소음이 가장
                      적은 기계식 키보드를 원하는 경우, 장시간 사용에도 피로감이
                      적은 키보드를 원하는 경우, 사무용 키보드를 찾는 경우
                      적합한 스위치입니다.
                    </p>
                  </div>
                </div>
              </article>
              <article>
                <h2 className="intro-title-s">Linear(흑축)</h2>
                <div className="p-grid">
                  <div>
                    <p>
                      흑축은 적축과 같은 리니어 타입의 스위치입니다. 하지만
                      적축보다 키압이 높습니다. 소음은 적지만 적축보다는 더
                      탄성이 있는 느낌을 원하는 경우 적합한 스위치입니다.
                    </p>
                  </div>
                  <img src="/info/info6.png" />
                </div>
              </article>
              <article>
                <h2 className="intro-title-s">색다른 즐거움</h2>
                <div className="p-grid">
                  <img src="/info/info1.png" />
                  <div>
                    <p>
                      기계식 키보드에는 타건감 이외에도 또 다른 재미를 주는 것이
                      있습니다. 바로 키캡입니다. 원하는 키캡으로 바꿔서 끼울 수
                      있기 때문에 취향에 따라 예쁘거나 독특한 디자인의 키캡을
                      끼워서 기계식 키보드를 꾸밀 수 있습니다.
                    </p>
                    <p>
                      또한 핫스왑이 가능한 키보드라면 위에서 언급한 다양한 축을
                      구입해 같은 키보드로 여러 가지 느낌을 즐길 수 있습니다.
                    </p>
                  </div>
                </div>
              </article>
              <p className="intro-p strong finish">
                <p>
                  어떠신가요?
                  <br />
                  마음에 드는 스위치가 있으셨나요?
                  <br />
                  이렇게 보기만 해서는 확신이 안 서신다고요?
                </p>
                <strong>백문이 불여일타!</strong>
                <p>
                  직접 타건해보며 자신에게 맞는{width > 768 ? ` ` : <br />}
                  기계식 키보드를 찾는 것이 가장 빠르고 좋은 방법입니다.
                  <br />
                  Keyplus에서는 여러 가지 키보드를 경험해볼 수 있는
                  {width > 768 ? ` ` : <br />}타건샵들을 한눈에 볼 수 있는
                  페이지를 만들었습니다.
                </p>
                <p>
                  <span className="bgc-gray">
                    기계식 키보드의 맛을 직접 느껴보세요!
                  </span>
                </p>
              </p>

              <strong>
                <div className="intro-link">
                  <Link to="/typing-shop">
                    지금 바로 찾으러 가기
                    <AiOutlineArrowRight
                      style={{ marginLeft: '2px', marginBottom: '-2px' }}
                    />
                  </Link>
                </div>
              </strong>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Introduction;
