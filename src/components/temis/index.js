import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import lodashGet from 'lodash.get';
import LeftMenu from './left-menu';
import TemisHeader from './top-header';
import './stylesheet.scss';
import styled from 'styled-components';

const Container = styled.div`
  @media (max-width: 991px) and (min-width: 768px) {
    padding-right: 0 !important;
    .temis-container {
      .content {
        padding-right: 15px;
      }
    }
  }
`;

const FrontendTemis = ({ location }) => {
  const pathname = lodashGet(location, 'pathname');
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <Container className="container-fluid p-l-0">
      <div className="temis-container">
        {/*

        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 no-padding temis-tab-nav">
          <div
            className={`nav-menu-content ${
              openMenu ? 'show-nav-menu-content' : ''
            }`}
          >
            <LeftMenu
              handleMenuClick={() => setOpenMenu(!openMenu)}
              path={pathname}
            />
            <div className="nav-menu" onClick={() => setOpenMenu(!openMenu)}>
              {openMenu ? (
                <i className="material-icons">keyboard_arrow_left</i>
              ) : (
                <i className="material-icons">keyboard_arrow_right</i>
              )}
            </div>
          </div>
        </div>
           */}

        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 content">
          {pathname === '/temis' ? (
            // this is a hack so that complete before using screen will not show this title
            <div className="text-center m-b-10">
              <TemisHeader />
            </div>
          ) : null}
          {renderRoutes(routes())}
        </div>
      </div>
    </Container>
  );
};

export default FrontendTemis;
