import React from 'react';

const KeyboardDetail = ({ location }) => {
  const keyboard = location.state.keyboard;
  return <>{keyboard.name}</>;
};

export default KeyboardDetail;
