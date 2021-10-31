import React from 'react';
import classNames from 'classnames';

import './styles/SwitchColor.scss';

const kr2en = {
  저소음적축: 'silent-red',
  적축: 'red',
  청축: 'blue',
  갈축: 'brown',
  흑축: 'black',
};

const SwitchColor = ({ keySwitch, detail }) => {
  return (
    <span className={classNames('switch-color-container', { detail })}>
      <span
        className={classNames('switch-color-main', kr2en[keySwitch])}
      ></span>
      <span className="switch-color-name">{keySwitch}</span>
    </span>
  );
};

export default SwitchColor;
