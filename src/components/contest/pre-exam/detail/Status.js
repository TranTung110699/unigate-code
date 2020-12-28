import React from 'react';
import Icon from 'antd/lib/icon';

export const Status = ({ type = 'success', text }) => {
  return (
    <div className={`text-${type}`}>
      <Icon
        type={type === 'success' ? 'check' : 'close'}
        className={`icon icon-${type}`}
      />
      {text}
    </div>
  );
};
