import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import { getOptionsPropertiesLogin, layouts } from 'configs/constants';

import MyPopover from 'components/common/views/popover';
import { logout } from 'actions/auth';
import {
  activeLoginTab,
  activeRegisterTab,
  openLoginDialog,
} from 'actions/auth/auth-dialog';
import PopItem from 'components/common/views/popover/Item';
import { getThemeConfig } from 'utils/selectors';
import SvgIcon, {
  logoutIcon,
  profileIcon,
  settingIcon,
  upgradeIcon,
} from 'common/icons/svg';
import Perm from 'common/utils/Perm';

import './stylesheet.scss';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openPopover: false, isShow: false };
  }

  handleOnOpenPopover = () => {
    const { openPopover } = this.state;
    const newState = !openPopover;
    this.setState({
      openPopover: newState,
    });
  };

  onShowLoginPopup = () => {
    const { dispatch } = this.props;
    dispatch(activeLoginTab());
    dispatch(openLoginDialog(getOptionsPropertiesLogin()));
  };

  onShowRegisterPopup = () => {
    const { dispatch } = this.props;
    dispatch(activeRegisterTab());
    dispatch(openLoginDialog(getOptionsPropertiesLogin()));
  };

  logoutAction = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  render() {
    const { userInfo, type, domainSchool, themeConfig } = this.props;
    let menuItemPanelClass = 'normal';
    if (type === 'fly') {
      menuItemPanelClass = 'fly';
    }

    const accountLabel =
      userInfo && userInfo.name ? userInfo.name : t1('account');
    let hasStaffRole = false;
    if (domainSchool) {
      hasStaffRole = Perm.hasPerm('staff');
    }

    return (
      <div className={`vieted-ui-main-menu ${menuItemPanelClass}`}>
        <div className="ui-nav-menu clearfix">
          <div className="pull-left">
            <Link to="/">
              <img src={themeConfig.logo} alt="logo" title="logo" />
            </Link>
          </div>
          {themeConfig.layout !== layouts.VIETED && (
            <div className=" pull-right">
              <ul className={`ui-top-menu-panel ${menuItemPanelClass}`}>
                {userInfo && userInfo.iid && (
                  <li>
                    <Link to="/dashboard">{`${t1('dashboard')}`}</Link>
                  </li>
                )}
                {userInfo && userInfo.iid && (
                  <li>
                    <div className="signined">
                      <span
                        onClick={this.handleOnOpenPopover}
                        className="profile-icon-panel"
                      >
                        <SvgIcon
                          path={profileIcon}
                          className="is-icon-profile-1-1 profile-icon"
                          viewBox="0 0 512 512"
                        />
                        {/* <a className="login-name m-r-10">{userInfo.name}</a>*/}
                        <MyPopover
                          className="ui-popover-logined"
                          show={this.state.openPopover}
                        >
                          <PopItem
                            linkTo="/user/update"
                            label={accountLabel}
                            path={settingIcon}
                            pathIconClass="is-icon-setting-gear-1"
                          />
                          {hasStaffRole && (
                            <PopItem
                              linkTo="/admin"
                              label={t1('admin')}
                              path={upgradeIcon}
                              pathIconClass="is-icon-rocket"
                            />
                          )}
                          <PopItem
                            label={t1('logout')}
                            action={this.logoutAction}
                            className="clearfix"
                          >
                            <span className="pull-right">
                              <SvgIcon
                                path={logoutIcon}
                                className="is-icon-log-out-1"
                                viewBox="0 0 512 512"
                              />
                            </span>
                          </PopItem>
                        </MyPopover>
                      </span>
                    </div>
                  </li>
                )}
                {(!userInfo || !userInfo.iid) && (
                  <li onClick={this.onShowLoginPopup}>
                    <a>{`${t1('login')}`}</a>
                  </li>
                )}
                {(!userInfo || !userInfo.iid) && (
                  <li onClick={this.onShowRegisterPopup}>
                    <a>{`${t1('register')}`}</a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  userInfo: state.user.info,
  domainSchool: state.domainInfo.domain || false,
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProp)(Menu);
