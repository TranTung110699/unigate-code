import React from 'react';
import { renderRoutes } from 'react-router-config';
import get from 'lodash.get';
import styled from 'styled-components';
import { t1 } from '../../translate';
import Perm from '../../common/utils/Perm';
import { Redirect } from 'react-router-dom';
import userLinks from '../../routes/links/user';
import { buyPackageUrl } from '../../routes/root-url';

const getTitle = (pathname = '') => {
  const currentPath = get(pathname.split('/'), '2');

  switch (currentPath) {
    case 'cart':
      return 'giỏ hàng';
    case 'checkout':
      return 'hướng dẫn thanh toán';
    default:
      return 'danh sách gói khóa học';
  }
};

const BuyCourseContainer = styled.div`
  max-width: none;
  padding: 50px 0;
  @media (max-width: 767px) {
    padding-top: 30px;
  }
  .card-item {
    background: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    border-radius: 5px !important;
    transition: box-shadow 0.6s ease-out;
    &:hover {
      box-shadow: 1px 8px 20px rgba(0, 0, 0, 0.5);
    }
  }
`;

const Title = styled.p`
  text-align: center;
  color: #434343;
  text-transform: uppercase;
  font-size: 24px;
  line-height: 28px;
`;

function Layout({ route, location }) {
  const { pathname } = location;

  if (Perm.isGuest() && pathname !== buyPackageUrl) {
    return <Redirect to={`${userLinks.login}?next=${pathname}`} />;
  }

  return (
    <BuyCourseContainer className="container">
      <Title>
        <strong>{t1(getTitle(pathname))}</strong>
      </Title>
      <div>{renderRoutes(route.routes)}</div>
    </BuyCourseContainer>
  );
}

export default Layout;
