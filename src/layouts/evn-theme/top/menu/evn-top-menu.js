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
import defaultLogo from 'layouts/evn-theme/resources/logo.png';
import ProfileDropdown from 'layouts/evn-theme/top/menu/ProfileDropdown';
import getTopMenus from './config';
import './stylesheet.scss';
import { getPathname } from 'common/selectors/router';

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
    } else if (tmp.length >= 3 && tmp[2] === 'notifications') {
      return 'notifications';
    } else if (tmp.length >= 3 && tmp[2] === 'my-enrolment-plans') {
      return 'my-enrolment-plans';
    } else if (tmp.length >= 3) {
      return tmp[1];
    }
    return tmp[tmp.length - 1];
  }
  return '';
};

const Menus = ({ menus, className, props }) => {
  const {
    domainSchool,
    themeConfig,
    requiredLogin,
    userInfo,
    dashboardAction,
  } = props;
  const activatedMenu = dashboardAction || '';

  return (
    menus &&
    menus.map((menu) => {
      const target = menu.target ? { target: menu.target } : {};

      if (menu.id === 'profile' && className !== 'menu-item-responsive') {
        return (
          <ProfileDropdown
            domainSchool={domainSchool}
            themeConfig={themeConfig}
            requiredLogin={requiredLogin}
            userInfo={userInfo}
            key={menu.id}
          />
        );
      }
      if (menu.id === 'logout' && className !== 'menu-item-responsive') {
        return null;
      }
      if (menu.href && menu.href.startsWith('http')) {
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
          )}`}
          to={menu.href || '#'}
          onClick={menu.action}
          key={menu.id}
          {...target}
        >
          {menu.icon && <img src={menu.icon} alt={'icon-top-menu'} />}
          <span className="label">{menu.label}</span>
        </Link>
      );
    })
  );
};

class EVNTopMEnu extends Component {
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
    const { themeConfig, requiredLogin, userInfo, conf } = this.props;
    let logo = defaultLogo;
    if (isMobileBrowser()) {
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
    });
    return (
      <div className="container" style={style.customWidth}>
        <div className="row evn-header-menu-top">
          <div className="col-md-3" style={style.noMarginLogo}>
            {logo && (
              <Link
                to={
                  window.enableMindmap ? '/dashboard/my-enrolment-plans' : '/'
                }
              >
                <img
                  className={`logo ${logo.className}`}
                  src={logo.link}
                  alt="logo"
                />
              </Link>
            )}
          </div>
          <div className="col-md-9 right">
            <div className="menu-right">
              {(!requiredLogin || !Perm.isGuest()) && [
                <Menus
                  menus={menus}
                  props={this.props}
                  key="top-menu-right-normal"
                />,
                <div
                  className="menu-responsive"
                  ref={this.setWrapperRef}
                  key="top-menu-right-responsive"
                >
                  <Icon
                    icon="menu"
                    className="menu"
                    style={style.buttonResponsive}
                    onClick={() => {
                      this.setState({ open: !this.state.open });
                    }}
                  />
                  {this.state.open && (
                    <div className="container-menu">
                      <Menus
                        className="menu-item-responsive"
                        menus={menus}
                        props={this.props}
                      />
                    </div>
                  )}
                </div>,
              ]}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EVNTopMEnu.propTypes = {};

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

export default connect(mapStateToProps)(EVNTopMEnu);
