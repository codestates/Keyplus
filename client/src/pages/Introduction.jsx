import React from 'react';
import './styles/Introduction.scss';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Introduction = () => {
  return (
    <>
      <section className="intro-container">
        <div className="intro-title">
          <h1 className="intro-big-title">
            기계식 키보드 입문자들을 위한 완벽 가이드
          </h1>
        </div>

        <div className="intro-contentsBx">
          <div className="intro-contents">
            <p className="intro-p1">
              키보드 구매를 생각하고 계신가요? <br /> 본 페이지는 키보드 구입이
              처음이신 분들을 위해 여러 종류의 키보드와 그에 대한 옵션들에 대한
              쉬운 이해를 돕는 페이지 입니다.
            </p>

            {/* <div className="intro-contentsBx">
              <div className="intro-img">
                <img src="/info1.png" />
              </div>
            </div> */}

            <h2 className="intro-title-s">멤브레인 키보드</h2>
            <div className="p8">
              <p>
                기계식 키보드를 접해보지 않은 사람이 있을 수는 있어도 멤브레인
                키보드는 사용해보지 않은 사람은 없을 정도로 가장 대중적인 키보드
                입니다.
                <br />
                멤브레인 키보드의 작동원리는 기계식 키보드와 달리 버튼마다
                개별적인 스위치가 달려있지 않고, 키캡을 누르면
                멤브레인(러버돔)이라 불리는 하얀 고무 부분을 눌러서 해당 키의
                신호가 입력되는 방식입니다. 또한 멤브레인(러버돔)이 한 장으로
                통으로 연결되어 있어 키보드 제작비가 기계식 키보드에 비해
                저렴합니다. 키보드 반발력이 낮아 장시간 사용 시 피로가 낮은 것도
                멤브레인 키보드의 장점입니다.
                <br />
                하지만 이런 멤브레인 키보드에도 단점이 존재 합니다. 상대적으로
                낮은 내구성과 동시입력 수가 낮아 게임용으로는 부적절합니다.
                멤브레인 키보드는 장시간 사용 시 피로도가 낮은 키보드를 원하고,
                저렴한 가격대와 소음이 적은 키보드를 원하시는 사용자에게
                추천되는 키보드 입니다.
              </p>
              <img src="/info2.png" />
            </div>

            <h2 className="intro-title-s">기계식 키보드</h2>
            <p>
              기계식 키보드는 각각의 버튼에 축이라고 불리는 스위치가 개별로
              들어갑니다. 이로 인해 멤브레인 키보드에 비해 높은 가격대로
              형성되어 있습니다. 또한 개별 스위치 덕분에 멤브레인 키보드 보다
              입력속도가 빠른 편이고, 빠르게 눌렀을 대 스위치마다 스프링이
              내장되어 있어 스위치 클릭 시 스프링의 반발력으로 인해 색다른
              키감을 느낄 수 있으며 무한 동시 입력이 가능합니다.
              <br />
              기계식 키보드는 방식에 따라 크게 3가지의 타입으로 구분됩니다.
            </p>

            <h2 className="intro-title-s">Click</h2>
            <div className="p8">
              <img src="/info3.png" />
              <p>
                클릭 타입은 타건감이 강하고, 찰칵찰칵 소리가 큰 것이 특징입니다.
                클릭키 스위치들은 키감이 높으며 이는 경쾌한 느낌 그리고 걸리는
                느낌이 강한 것과 연관이 있습니다. 클릭키를 사용하는 대표적인
                축으로는 <strong>청축, 녹축</strong> 그리고 <strong>백축</strong>이 있습니다. 확실한 키감과 경쾌한
                소리의 기계식 키보드를 원하거나, 게임용으로 사용을 원하는
                경우라면 적합한 스위치입니다.
                <br />
                <strong>스위치 압력 : 50g(+-15g)</strong>
              </p>
            </div>

            <h2 className="intro-title-s">Tactile</h2>
            <div className="p8">
              <img src="/info4.png" />
              <p>
                택타일은 넌클릭 타입이라고도 하며, 클릭 타입에 비해 소음이
                작습니다. 미세한 걸림이 있어 리니어 타입보다 타건감이
                뚜렸합니다. 대표적인 축으로는 <strong>갈축, 회축</strong> 그리고 <strong>클리어 축</strong>이
                있습니다. 소음이 적은 기계식 키보드를 원하는 경우나 적당한
                키감을 원하는 경우, 또는 범용(사무용, 게임용)으로 사용을 원하는
                경우에 적합한 스위치 입니다.
                <br />
                <strong>스위치 압력 : 45g(+-20g)</strong>
              </p>
            </div>

            <h2 className="intro-title-s">Linear</h2>
            <div className="p8">
              <p>
                리니어는 구조상 소음이 가장 적습니다. 기계적인 느낌이 가장
                낮으며 걸림이 없습니다. 키감이 낮고, 키 입력 압력이 낮아
                부드러운 타건이 가능하며 장시간 사용 시 피로도가 낮습니다.
                대표적인 축으로는 <strong>적축, 흑축, 저소음 적축, 저소음 흑축,
                스피드실버축</strong> 그리고 <strong>진회축</strong>이 있습니다. 소음이 가장 적은 기계식
                키보드를 원하는 경우, 장시간 사용으로 피로감이 적은 키보드를
                원하는 경우나 부드러운 키 압력을 원하는 경우나 사무용으로
                사용하는 경우 적합한 스위치 입니다.
                <br />
                <strong>스위치 압력 : 45g(+-20g)</strong>
              </p>
              <img src="/info5.png" />
            </div>

            <h2 className="intro-title-s">흑축</h2>
            <div className="p8">
              <p>
                흑축은 적축과 같은 리니어 타입의 스위치 입니다. 하지만 적축보다
                키 입력감이 높아 타이핑 시 적축보다 더 탄성이 있는 느낌을 원하는
                경우나, 소음이 적은 키보드를 원하는 경우 적합한 스위치 입니다.
                <br />
                <strong>스위치 압력 : 60g(+-20g)</strong>
              </p>
              <img src="/info6.png" />
            </div>

            <h2 className="intro-title-s">펜타그래프</h2>
            <div className="p8">
              <img src="/info7.png" />
              <p>
                펜타그래프 키보드는 일반 노트북 키보드를 생각하시면 됩니다.
                대표적인 키보드로는 애플 매직키보드, mxkeys등이 존재합니다. 낮은
                키감, 적은 힘으로도 타이핑이 가능하며 슬림형 타입으로 제작이
                가능합니다. 작동원리는 멤브레인 키보드와 비슷하지만 내부
                구조에서 차이가 있습니다. 장시간 사용해도 피로도가 낮은 키보드를
                원하는 경우나, 슬림한 타입의 키보드를원하는 경우 적합합니다.
              </p>
            </div>

            <h2 className="intro-title-s">색다른 즐거움</h2>
            <div className="p8">
              <p>
                기계식 키보드에는 타건감 이외에도 또 다른 재미를 주는 것이
                있습니다. 바로 키캡 입니다. 원하는 키캡으로 바꿔서 끼울 수 있기
                때문에 취향에 따라 예쁘거나 독특한 디자인의 키캡을 끼워서 기계식
                키보드를 꾸밀 수 있습니다. 또한 핫 스왑이 가능한 키보드라면 위
                언급한 축을 구입해 축 교체가 가능합니다.
              </p>
              <img src="/info1.png" />
            </div>

            <strong>
              지금까지의 설명을 읽어도 타건감 등 직접 경험해보지 않으면 알
              수없는 것들이 있습니다.
              <br /> 직접 타건해보며 자신에게 맞는 기계식 키보드를 찾는 것이
              사실은 가장 빠르고 좋은 방법일 수 있습니다.<br />
              Keyplus에서는 여러 키보드를 경험해볼 수 있는 유명 타건샵들을
              한번에 모아 볼 수 있는 페이지를 만들었습니다.
              <br />
            </strong>

            <Link to="/map">
              <strong>
                <div className="intro-link">
                  지금 바로 찾으러 가기
                  <AiOutlineArrowRight style={{ marginBottom: '-2px' }} />
                </div>
              </strong>
            </Link>
          </div>
        </div>
      </section>
      {/* <h1>기계식 키보드란?</h1>
      <h2>멤브레인 키보드</h2>
      <h2>기계식 키보드</h2>
      <h1>키 스위치 종류</h1>
      <h2>청축</h2>
      <h2>갈축</h2>
      <h2>적축</h2>
      <h2>흑축</h2>
      <h2>저소음 적축</h2>
      <h1>기계식 키보드 추천</h1>
      <h2>기계식 키보드 추천</h2>
      <h1>기타</h1>
      <h2>무접점 키보드</h2> */}
    </>
  );
};

export default Introduction;