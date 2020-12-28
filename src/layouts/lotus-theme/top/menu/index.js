import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { Link, NavLink, withRouter } from 'react-router-dom';
import MyPopover from 'components/common/views/popover';
import { logout } from 'actions/auth';
import { openLoginDialog } from 'actions/auth/auth-dialog';
import PopItem from 'components/common/views/popover/Item';
import Hamburger from 'material-ui/svg-icons/image/dehaze';
import Icon from 'components/common/Icon';
import { getThemeConfig } from 'utils/selectors';
import SvgIcon, { logoutIcon } from 'common/icons/svg';
import Perm from 'common/utils/Perm';
import { getOptionsPropertiesLogin } from 'configs/constants';
import userLinks from 'routes/links/user';

import './stylesheet.scss';

class Menu extends React.Component {
  hamburgerStyle = { width: 44, height: 44, color: '#DCAB18' };

  constructor(props) {
    super(props);
    this.state = {
      openPopover: false,
      isShow: false,
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

  onShowLoginPopup = () => {
    const { dispatch } = this.props;
    dispatch(openLoginDialog(getOptionsPropertiesLogin()));
  };

  showMenuResponsive = () => {
    this.setState((prevState) => ({ isShow: !prevState.isShow }));
  };

  getContentClass(isShow) {
    if (isShow) {
      return 'content';
    }
    return 'content invisible';
  }

  logoutAction = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  hasShowTopMenu = (menu) => {
    const { themeConfig } = this.props;
    if (themeConfig.top_menus_available.indexOf(menu) !== -1) {
      return true;
    }

    return false;
  };

  render() {
    const { userInfo, domainSchool, themeConfig } = this.props;

    const hasStaffRole = domainSchool && Perm.hasPerm('staff');
    const hasSystemRole = domainSchool && Perm.hasPerm('root', 'system');

    return (
      <div className="menu-top-wrapper">
        <div className="menu-top">
          <div className="container">
            <div className="row">
              <div className="logo left">
                <Link to="/" title="Trang chủ">
                  <img src={themeConfig.logo} alt="" />
                </Link>
              </div>
              <div className="navigation">
                <ul className="navigation-bar screen">
                  {userInfo && userInfo.iid && this.hasShowTopMenu('faq') && (
                    <li>
                      <NavLink to="/faq" title="" className="nav-link">
                        {t1('faq')}
                      </NavLink>
                    </li>
                  )}
                  {userInfo && userInfo.iid && this.hasShowTopMenu('blog') && (
                    <li>
                      <NavLink to="/blog" title="" className="nav-link">
                        {t1('news')}
                      </NavLink>
                    </li>
                  )}
                  {userInfo &&
                    userInfo.iid &&
                    this.hasShowTopMenu('dashboard') && (
                      <li>
                        <NavLink to="/dashboard" title="" className="nav-link">
                          {t1('dashboard')}
                        </NavLink>
                      </li>
                    )}
                  {userInfo && userInfo.iid && <li className="slang" />}
                  {(!userInfo || !userInfo.iid) && (
                    <li onClick={this.onShowLoginPopup}>
                      <a className="login-btn nav-link">{t1('login')}</a>
                    </li>
                  )}
                  {userInfo && userInfo.iid && (
                    <li
                      className="user-infor"
                      onClick={this.handleOnOpenPopover}
                    >
                      <span className="profile-icon-panel">
                        <Icon icon="user" />
                      </span>
                      <div className="signined">
                        <p>{userInfo.name}</p>
                      </div>
                      <MyPopover
                        className="ui-popover-logined"
                        show={this.state.openPopover}
                      >
                        <PopItem
                          linkTo={userLinks.update_profile_info}
                          label={t1('profile')}
                          pathIconClass="is-icon-rocket"
                        />
                        {hasSystemRole && (
                          <PopItem
                            linkTo="/system"
                            label={t1('system')}
                            pathIconClass="is-icon-rocket"
                          />
                        )}
                        {hasStaffRole && (
                          <PopItem
                            linkTo="/admin"
                            label={t1('admin')}
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
                    </li>
                  )}
                </ul>
                <div className="mobile hamburger-btn">
                  <div onClick={this.showMenuResponsive}>
                    <Hamburger style={this.hamburgerStyle} />
                  </div>
                  <ul
                    className={`mobile ${this.getContentClass(
                      this.state.isShow,
                    )}`}
                  >
                    {userInfo && userInfo.iid && this.hasShowTopMenu('faq') && (
                      <li>
                        <NavLink to="/faq" title="" className="nav-link">
                          {t1('faq')}
                        </NavLink>
                      </li>
                    )}
                    {userInfo && userInfo.iid && this.hasShowTopMenu('blog') && (
                      <li>
                        <NavLink to="/blog" title="" className="nav-link">
                          {t1('news')}
                        </NavLink>
                      </li>
                    )}
                    {userInfo &&
                      userInfo.iid &&
                      this.hasShowTopMenu('dashboard') && (
                        <li>
                          <NavLink
                            to="/dashboard"
                            title=""
                            className="nav-link"
                          >
                            {t1('dashboard')}
                          </NavLink>
                        </li>
                      )}
                    {hasSystemRole && (
                      <li>
                        <NavLink to="/system" title="" className="nav-link">
                          {t1('system')}
                        </NavLink>
                      </li>
                    )}
                    {hasStaffRole && (
                      <li>
                        <NavLink to="/admin" title="" className="nav-link">
                          {t1('admin')}
                        </NavLink>
                      </li>
                    )}
                    {(!userInfo || !userInfo.iid) && (
                      <li>
                        <a onClick={this.onShowLoginPopup} className="nav-link">
                          {t1('login')}
                        </a>
                      </li>
                    )}
                    {userInfo && userInfo.iid && (
                      <li>
                        <NavLink
                          to={userLinks.update_profile_info}
                          title=""
                          className="nav-link"
                        >
                          {t1('profile')}
                        </NavLink>
                      </li>
                    )}
                    {userInfo && userInfo.iid && (
                      <li>
                        <a
                          title=""
                          onClick={() => this.logoutAction()}
                          className="nav-link"
                        >
                          {t1('logout')}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  userInfo: state.user.info,
  domainSchool: state.domainInfo.domain,
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProp)(withRouter(Menu));
