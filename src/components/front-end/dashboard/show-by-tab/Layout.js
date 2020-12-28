import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LayoutHelper from 'layouts/LayoutHelper';
import Perm from 'common/utils/Perm';
import lGet from 'lodash.get';
import FlyPanel from 'components/common/views/fly-panel';
import ImageBackGround from 'components/common/views/image-background';
import Menu from 'components/common/views/menu';
import { layouts } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors/index';
import { isK12 } from 'common/k12';
import { renderRoutes } from 'react-router-config';
import LeftMenu from './left-menu/index-v2';
import './stylesheet.scss';
import { getDashboardUrl } from '../../../../routes/links/common';
import styled from 'styled-components';

const Icon = styled.i`
  font-size: 30px !important;
`;

const getActionFromPathName = (pathname) => {
  const res = pathname.split('/');
  const action = res[res.length - 1];
  return action;
};

const getPathName = (props) => {
  const pathname = lGet(props, 'match.path');
  const checkPath = lGet(props, 'pathname').split('/');
  if (checkPath.length >= 2) {
    if (
      checkPath[2] === 'upcoming-contests' ||
      checkPath[2] === 'taken-contests'
    )
      return 'contest';
    if (checkPath[2] === 'my-enrolment-plans') return 'my-enrolment-plans';
  }
  const res = pathname.split('/');
  return res[res.length - 1];
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { openMenu: false };
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  render() {
    const {
      dashboardType,
      themeConfig,
      pathname,
      userInfo,
      domainConfig,
    } = this.props;
    const { route } = this.props;
    const action = getActionFromPathName(pathname);
    const path = getPathName(this.props);

    if (Perm.isGuest() && !window.isGoJapan) {
      return <Redirect to="/" />;
    } else if (this.props.k12) {
      // teacher in K12 will go to admin
      if (userInfo.roles && userInfo.roles.length)
        return <Redirect to="/admin" />;
    }

    return (
      <div className="ggg-dashboard-wrapper">
        {themeConfig.layout === layouts.PIXELZ && (
          <div>
            <FlyPanel breakPoint={250}>
              <Menu type="fly" />
            </FlyPanel>
            <ImageBackGround
              width="100%"
              height={250}
              src="/media/images/pixelz/dashboard.png"
            >
              <Menu />
            </ImageBackGround>
          </div>
        )}

        <div className="container" style={{ maxWidth: 'none' }}>
          <div className="row">
            {/* <Breadcrumbs action={action} /> */}
            <div
              className={`dashboard-show-by-tab-wrapper m-t-25 ${
                themeConfig.layout === layouts.GJ ? 'p-b-20 gj' : ''
              }`}
            >
              {userInfo &&
              userInfo.is_parent !== 1 &&
              !(
                (domainConfig.hide_student_leftmenu_dashboard &&
                  !pathname.includes('/profile')) ||
                (window.isGoJapan && pathname === getDashboardUrl('courses'))
              ) ? (
                [
                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 no-padding sticky-card z-index-1000">
                    <div
                      className={`nav-menu-content ${
                        this.state.openMenu ? 'show-nav-menu-content' : ''
                      }`}
                    >
                      <LeftMenu
                        handleMenuClick={() => {
                          this.setState({ openMenu: !this.state.openMenu });
                        }}
                        activatedMenu={dashboardType}
                        path={path}
                      />
                      <div
                        className="nav-menu"
                        onClick={() => {
                          this.setState({ openMenu: !this.state.openMenu });
                        }}
                      >
                        {this.state.openMenu ? (
                          <Icon className="material-icons">
                            keyboard_arrow_left
                          </Icon>
                        ) : (
                          <Icon className="material-icons">
                            keyboard_arrow_right
                          </Icon>
                        )}
                      </div>
                    </div>
                  </div>,
                  <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 content">
                    {renderRoutes(route.routes)}
                  </div>,
                ]
              ) : (
                <div>{renderRoutes(route.routes)}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Layout.defaultProps = {
  pathname: '',
};

Layout.propTypes = {
  pathname: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  const { type } = props;
  const userInfo = state.user.info;
  let dashboardType = type;
  if (!dashboardType) {
    dashboardType = 'in-progress-courses';
  }
  return {
    dashboardType,
    userInfo,
    themeConfig: getThemeConfig(state),
    pathname: lGet(props, 'location.pathname'),
    k12: isK12(state),
    domainConfig: lGet(state, 'domainInfo.conf'),
  };
};

export default connect(mapStateToProps)(Layout);
