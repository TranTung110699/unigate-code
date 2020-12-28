import React from 'react';
import AntdButton from 'antd/lib/button';
import styled from 'styled-components';

const MainButton = styled(AntdButton)`
  border-radius: 100px !important;
`;

function Button({ className = '', ...props }) {
  return <MainButton {...props} className={`primary-button ${className}`} />;
}

export default Button;
