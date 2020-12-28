import React from 'react';
import Row from 'antd/lib/grid/row';
import UserInfo from './UserInfo';
import Recent from './Recent';
import Col from 'antd/lib/grid/col';
import styled from 'styled-components';

const AntRow = styled(Row)`
  @media (max-width: 768px) {
    margin: 0 !important;
    h3 {
      margin-bottom: 12px !important;
    }
  }
`;

function UserInfoOnTop({ user }) {
  return (
    <AntRow gutter={32}>
      <Col xs={24} sm={24} md={24} lg={12} className="m-t-10">
        <UserInfo user={user} />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} className="m-t-10">
        <Recent user={user} />
      </Col>
    </AntRow>
  );
}

export default UserInfoOnTop;
