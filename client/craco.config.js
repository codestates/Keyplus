const CracoLessPlugin = require('craco-less');
const { gray } = require('@ant-design/colors');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // ? 체크박스, 라디오 버튼 클릭, 선택된 탭처럼 누른 거 색깔 / 버튼 타입 프라이머리 배경 색깔
              // ? 그냥 버튼 호버 시 글자 색깔, 로딩 인디케이터 색깔, 드래그 색깔
              'primary-color': '#808080', // primary color for all components

              'link-color': '#000', // link color

              'success-color': '#0DD078', // success state color
              'warning-color': 'gold', // warning state color
              'error-color': '#f5222d', // error state color

              'font-size-base': '14px', // major text font size

              'heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color

              // ? 색상 안 준 기본 글자 컬러, 아이콘 컬러
              'text-color': 'rgba(0, 0, 0, 0.7)', // major text color

              // ? ant-card-meta-description
              'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color

              'disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color

              'border-radius-base': '2px', // major border radius
              'border-color-base': '#000', // major border color

              'box-shadow-base': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', // major shadow for layers
              // 'background-color-base': 'rgba(0, 0, 0, 0.85)',
              // 'background-color-light': 'gold',

              // ? 보통 컴포넌트 배경 색깔 & radio 버튼 배경
              'component-background': '#fff', // 디폴트 : #fff
              'select-item-selected-bg': '#dfdfdf',

              'box-shadow-base': 'green',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
