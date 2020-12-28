import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import lGet from 'lodash.get';
import { getOptionsPropertiesLogin, layouts } from 'configs/constants';
import { isMobileBrowser } from 'common';
import {
  getConf,
  getRequiredLogin,
  getSchool,
  getThemeConfig,
} from 'utils/selectors';
import Perm from 'common/utils/Perm';
import {
  activeLoginTab,
  activeRegisterTab,
  openLoginDialog,
} from 'actions/auth/auth-dialog';
import { logout } from 'actions/auth';
import Icon from 'components/common/Icon';
import ProfileDropdown from './ProfileDropdown';
import getTopMenus from './config';
import './stylesheet.scss';
import { getPathname } from 'common/selectors/router';
import styled from 'styled-components';
import { websiteUrl } from 'configs/constants';
import { isSmallScreen } from '../../../../common';

const style = {
  buttonResponsive: {
    marginLeft: 3,
    fontSize: 29,
  },
  customWidth: {
    padding: '0 20px',
    margin: '0 auto',
    // maxWidth: '1300px',
    width: '100%',
  },
  noMarginLogo: {
    paddingLeft: '15px',
  },
};

const HeaderContainer = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 591px) {
    padding: 0;
  }
  @media (max-width: 720px) {
    .menu-item--text {
      display: none;
    }
  }
`;

const getMenuActiveClass = (menu, activeMenu) => {
  if (menu && menu === 'home') menu = '';
  return menu === activeMenu ? 'active' : '';
};

const getDashboardByAction = (state) => {
  const pathname = getPathname(state);
  if (pathname) {
    const tmp = pathname.split('/');
    if (
      tmp.length >= 3 &&
      (tmp[2] === 'upcoming-contests' || tmp[2] === 'taken-contests')
    ) {
      return 'upcoming-contests';
    } else if (
      tmp.length >= 3 &&
      ['notifications', 'my-enrolment-plans', 'courses', 'buy-course'].includes(
        tmp[2],
      )
    ) {
      return tmp[2];
    } else if (tmp.length >= 3) {
      return tmp[1];
    }
    return tmp[tmp.length - 1];
  }
  return '';
};

const getMenuIcon = (menu, type = 'default') => (
  <Icon
    antIcon
    component={() => <img src={lGet(menu.icon, `image.${type}`)} alt="" />}
    className="menu-icon"
  />
);

const Menus = ({ menus, className, props }) => {
  const {
    domainSchool,
    themeConfig,
    requiredLogin,
    userInfo,
    dashboardAction,
  } = props;

  const [hoverItem, setHoverItem] = React.useState(null);

  const activatedMenu = dashboardAction || '';

  return (
    menus &&
    menus.map((menu) => {
      const target = menu.target ? { target: menu.target } : {};

      // if (menu.id === 'profile' && className !== 'menu-item-responsive') {
      //   return (
      //     <ProfileDropdown
      //       domainSchool={domainSchool}
      //       themeConfig={themeConfig}
      //       requiredLogin={requiredLogin}
      //       userInfo={userInfo}
      //       key={menu.id}
      //     />
      //   );
      // }
      if (menu.id === 'logout' && className !== 'menu-item-responsive') {
        return null;
      }
      if (menu.id === 'home' && isSmallScreen) {
        return null;
      } else if (menu.id === 'home') return null;

      if (menu.href && menu.href.startsWith('http') && menu.id !== 'home') {
        return (
          <a className="menu-item" href={menu.href} key={menu.id} {...target}>
            <span className="label">{menu.label}</span>
          </a>
        );
      }

      return (
        <Link
          className={`menu-item ${className} ${getMenuActiveClass(
            menu.id,
            activatedMenu,
          )}
          `}
          to={menu.href || '#'}
          onClick={menu.action}
          key={menu.id}
          {...target}
          onMouseEnter={() => setHoverItem(menu.id)}
          onMouseLeave={() => setHoverItem(null)}
        >
          <span className="label">
            {menu.icon &&
              getMenuIcon(
                menu,
                hoverItem === menu.id && menu.id !== activatedMenu
                  ? 'hover'
                  : menu.id === activatedMenu
                  ? 'active'
                  : 'default',
              )}
            {!(menu.id === 'home' && className !== 'menu-item-responsive') && (
              <strong className="menu-item--text">{menu.label}</strong>
            )}
          </span>
        </Link>
      );
    })
  );
};

class GJTopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ open: false });
    }
  };

  logoutAction = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  onShowLoginPopup = () => {
    const { dispatch } = this.props;
    dispatch(activeLoginTab());
    dispatch(openLoginDialog(getOptionsPropertiesLogin(layouts.EVN)));
  };

  onShowRegisterPopup = () => {
    const { dispatch } = this.props;
    dispatch(activeRegisterTab());
    dispatch(openLoginDialog(getOptionsPropertiesLogin(layouts.EVN)));
  };

  render() {
    const {
      themeConfig,
      requiredLogin,
      userInfo,
      conf,
      domainSchool,
    } = this.props;
    let logo;
    if (isSmallScreen) {
      logo = {
        link: lGet(themeConfig, 'mobile_logo', ''),
        className: 'mobile-logo',
      };
    } else {
      logo = {
        link: lGet(themeConfig, 'logo', ''),
        className: 'desktop-logo',
      };
    }
    const topMenusAvailable = lGet(themeConfig, 'top_menus_available', '');
    const menus = getTopMenus({
      logoutAction: this.logoutAction,
      loginAction: this.onShowLoginPopup,
      registerAction: this.onShowRegisterPopup,
      topMenusAvailable,
      themeConfig,
      userInfo,
      conf,
    })
      .filter((menu) => menu.id !== 'profile')
      .filter((menu) => Object.keys(menu).length !== 0);

    return (
      <HeaderContainer>
        <div className="gj-header-menu-top">
          <div className="left d-flex">
            <div className="menu-left">
              {!isSmallScreen && (
                <div className="menu-left-logo p-20">
                  <a href={websiteUrl} target="_blank">
                    <img
                      className={`logo ${logo.className}`}
                      src={logo.link}
                      alt="logo"
                    />
                  </a>
                </div>
              )}
              <Menus
                menus={menus}
                props={this.props}
                key="top-menu-left-normal"
              />
              {/* <div
                  className="menu-responsive"
                  ref={this.setWrapperRef}
                  key="top-menu-left-responsive"
                >
                  <Icon
                    icon="menu"
                    className="menu"
                    style={style.buttonResponsive}
                    onClick={() => {
                      this.setState({ open: !this.state.open });
                    }}
                  />{' '}
                  {this.state.open && (
                    <div className="container-menu">
                      <Menus
                        className="menu-item-responsive"
                        menus={menus}
                        props={this.props}
                      />
                    </div>
                  )}
                </div>*/}
            </div>

            {!Perm.isGuest() && (
              <ProfileDropdown
                domainSchool={domainSchool}
                themeConfig={themeConfig}
                requiredLogin={requiredLogin}
                userInfo={userInfo}
              />
            )}
          </div>
        </div>
      </HeaderContainer>
    );
  }
}

GJTopMenu.propTypes = {};

const userInfoFunc = (state) => lGet(state, 'user.info');

const getDashboardAction = (state) => getDashboardByAction(state);

const mapStateToProps = createSelector(
  getSchool,
  getThemeConfig,
  getRequiredLogin,
  userInfoFunc,
  getDashboardAction,
  getConf,
  (
    domainSchool,
    themeConfig,
    requiredLogin,
    userInfo,
    dashboardAction,
    conf,
  ) => ({
    domainSchool,
    themeConfig,
    requiredLogin,
    userInfo,
    dashboardAction,
    conf,
  }),
);

export default connect(mapStateToProps)(GJTopMenu);
