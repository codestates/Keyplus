const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#808080', // primary color for all components
              'link-color': '#000', // link color
              'success-color': '#0DD078', // success state color
              'warning-color': '#000', // warning state color
              'error-color': '#f5222d', // error state color
              'font-size-base': '14px', // major text font size
              'heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
              'text-color': 'rgba(0, 0, 0, 0.65)', // major text color
              'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
              'disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
              'border-radius-base': '2px', // major border radius
              'border-color-base': '#000', // major border color
              'box-shadow-base': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', // major shadow for layers
              'background-color-base': '#000',
              // 'background-color-light': '#808080',
              // 'component-background': '#808080',
              'select-item-selected-bg': '#808080',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
