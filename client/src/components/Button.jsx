import React from 'react';

import './styles/Button.scss';

const Button = ({ children }) => {
  return (
    <div id="button-wrapper">
      <div id="button">{children}</div>
    </div>
  );
};

export default Button;
