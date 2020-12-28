import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';

import MyPopover from 'components/common/views/popover';
import { logout } from 'actions/auth';
import {
  activeLoginTab,
  activeRegisterTab,
  openLoginDialog,
} from 'actions/auth/auth-dialog';
import PopItem from 'components/common/views/popover/Item';
import SvgIcon, { profileIcon } from 'common/icons/svg';
import Perm from 'common/utils/Perm';
import { getThemeConfig } from 'utils/selectors';
import { withRouter } from 'react-router';
import get from 'lodash.get';
import getNavigationBars, { profileConfig } from './config';

import Humberger from './humberger.png';
import './stylesheet.scss';

class Menu extends React.Component {
  liStyle = { display: 'none' };

  constructor(props) {
    super(props);
    this.state = { openPopover: false, isShow: false };
  }

  componentDidMount() {
    document.getElementById('navigation-bar').onclick = (e) => {
      if (this.state.isShow) {
        this.setState({ isShow: false });
      }
    };
  }

  hiddenPopover = () => {
    this.setState({
      openPopover: false,
    });
  };

  handleOnOpenPopover = () => {
    const { openPopover } = this.state;
    const newState = !openPopover;
    this.setState({
      openPopover: newState,
    });
  };

  showMenuResponsive = () => {
    this.setState((prevState) => ({ isShow: !prevState.isShow }));
  };

  onShowLoginPopup = () => {
    const { dispatch } = this.props;
    dispatch(activeLoginTab());
    dispatch(openLoginDialog());
  };

  onShowRegisterPopup = () => {
    const { dispatch } = this.props;
    dispatch(openLoginDialog());
    dispatch(activeRegisterTab());
  };

  logoutAction = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  renderLogo = () => {
    const { type, themeConfig } = this.props;
    return (
      <Link to="/">
        {
          <img
            src={
              type && type === 'fly' ? themeConfig.black_logo : themeConfig.logo
            }
            title="logo"
          />
        }
      </Link>
    );
  };

  renderUserInfo = () => {
    const { userInfo, domainSchool } = this.props;

    const accountLabel =
      userInfo && userInfo.name ? userInfo.name : t1('account');
    let hasStaffRole = false;
    let hasSystemRole = false;
    if (domainSchool) {
      hasSystemRole = Perm.hasPerm('root', 'system');
      if (!hasSystemRole) {
        hasStaffRole = Perm.hasPerm('staff');
      }
    }

    const items = profileConfig({
      hasStaffRole,
      hasSystemRole,
      accountLabel,
      logoutAction: this.logoutAction,
    });

    return [
      <li>
        <div className="signined profile-web">
          <span
            onClick={this.handleOnOpenPopover}
            className="profile-icon-panel"
          >
            <SvgIcon
              path={profileIcon}
              className="is-icon-profile-1-1 profile-icon"
              viewBox="0 0 512 512"
            />
            <MyPopover
              className="ui-popover-logined"
              show={this.state.openPopover}
            >
              {items &&
                items.map((item) => (
                  <PopItem
                    label={item.label}
                    path={item.path}
                    pathIconClass={item.icon}
                    linkTo={item.linkTo}
                    action={item.action}
                    className={item.className}
                  >
                    {item.children}
                  </PopItem>
                ))}
            </MyPopover>
          </span>
        </div>
      </li>,
      <div className={'profile-mobile indicator'} />,
      items.map((item) => (
        <li className={'profile-mobile'}>
          <Link
            to={item.linkTo || '#'}
            className={`item ${item.className}`}
            onClick={item.action}
            style={item.style}
          >
            {item.label}
          </Link>
        </li>
      )),
    ];
  };

  renderNavigationBar = ({ navs, className }) => (
    <ul className={className} id="navigation-bar">
      {navs.map((item) => {
        if (item.id === 'user-info') {
          return this.renderUserInfo();
        }
        return (
          <li>
            <Link
              to={item.href || '#'}
              className={`item ${item.className}`}
              onClick={item.handleClick}
              style={item.style}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  render() {
    const { userInfo, type } = this.props;

    const menuItemPanelClass = type === 'fly' ? 'fly' : 'normal';
    const menuItemPanelMobileClass = this.state.isShow
      ? 'mobile-show-nav-menu'
      : 'mobile-hide-nav-menu';
    const menuItemPanelLearnScreen = ['learn', 'p-learn', 'overview'].includes(
      this.props.type_viewer,
    )
      ? 'learn-nav-color'
      : '';

    const navs = getNavigationBars({
      user: userInfo,
      handleSignIn: this.onShowLoginPopup,
      handleSignUp: this.onShowRegisterPopup,
    });

    return (
      <div className={`ui-main-menu-xpeak ${menuItemPanelClass}`}>
        <div className={`ui-nav-menu ${menuItemPanelLearnScreen}`}>
          <div className="left">{this.renderLogo()}</div>
          <div className="right">
            <button
              onClick={this.showMenuResponsive}
              className={'humberger'}
              id="humberger"
            >
              <img src={Humberger} />
            </button>
            {this.renderNavigationBar({
              navs,
              className: `ui-top-menu-panel ${menuItemPanelClass} ${menuItemPanelMobileClass}`,
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state, props) => ({
  userInfo: state.user.info,
  enableRegisters:
    state.domainInfo.conf && state.domainInfo.conf.enable_registers,
  domainSchool: state.domainInfo.domain || false,
  themeConfig: getThemeConfig(state),
  type_viewer: get(props, 'match.params.type_viewer'),
});

export default withRouter(connect(mapStateToProp)(Menu));
