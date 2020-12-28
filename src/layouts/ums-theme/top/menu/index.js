import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { Link, withRouter } from 'react-router-dom';
import MyPopover from 'components/common/views/popover';
import { logout } from 'actions/auth';
import PopItem from 'components/common/views/popover/Item';
import Hamburger from 'material-ui/svg-icons/image/dehaze';
import SvgIcon, { logoutIcon } from 'common/icons/svg';
import Perm from 'common/utils/Perm';
import { getThemeConfig } from 'utils/selectors';
import Avatar from 'components/common/avatar/index';
import { createSelector } from 'reselect';
import userLinks from 'routes/links/user';
import WuMenuInfo from './wu-menu-info';
import ADSMenuInfo from './ads-menu-info';
import BCMenuInfo from './bc-menu-info';
import VEMenuInfo from './ve-menu-info';
import PhuxuanMenuInfo from './phuxuan-menu-info';
import './stylesheet.scss';

class Menu extends React.Component {
  divStyle = { padding: 0 };
  popItemStyle = { cursor: 'pointer', borderTop: '1px solid #eee' };
  spanStyle = { paddingLeft: '10px', marginLeft: '10px' };
  hamburgerStyle = {
    width: 34,
    height: 34,
    padding: 6,
    color: '#e13542',
    cursor: 'pointer',
  };

  constructor(props) {
    super(props);
    this.state = {
      openPopover: false,
      isShow: false,
    };
  }

  handleOnOpenPopover = () => {
    const { openPopover } = this.state;
    const newState = !openPopover;
    this.setState({
      openPopover: newState,
    });
  };
  handleCloseMenu = () => {
    this.setState({ isShow: false, openPopover: false });
  };

  showMenuResponsive = () => {
    this.setState((prevState) => ({ isShow: !prevState.isShow }));
  };

  getContentClass = (isShow) => (isShow ? 'content' : 'content invisible');

  logoutAction = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  switchMenuTopInfo = (domainSchool) => {
    switch (domainSchool) {
      case 'wu':
        return <WuMenuInfo />;
      case 'bc':
        return <BCMenuInfo />;
      case 'ads':
        return <ADSMenuInfo />;
      case 'phuxuan':
        return <PhuxuanMenuInfo />;
      default:
        return <VEMenuInfo />;
    }
  };

  render() {
    const { userInfo, domainSchool, themeConfig, availableMenus } = this.props;

    let hasStaffRole = false;
    let hasSystemRole = false;
    if (domainSchool) {
      hasSystemRole = Perm.hasPerm('root', 'system');
      if (!hasSystemRole) {
        hasStaffRole = Perm.hasPerm('staff');
      }
    }
    return (
      <div className="ums-menu-top-wrapper">
        {/* (themeConfig && themeConfig.school &&
          themeConfig.school === schoolsOfTheme.WU) ?
            <WuMenuInfo /> :
            <ApcMenuInfo /> */}
        {this.switchMenuTopInfo(domainSchool)}
        <div className="menu-top">
          <div className="container">
            <div className="row">
              <div className="logo left">
                <Link to="/" title={t1('home')}>
                  <img src={themeConfig.logo} alt="" />
                </Link>
              </div>
              <div className="navigation">
                <ul className="navigation-bar screen">
                  {userInfo && userInfo.iid && (
                    <li
                      className="user-infor"
                      onClick={this.handleOnOpenPopover}
                    >
                      <span className="profile-icon-panel">
                        <Avatar user={userInfo} />
                      </span>
                      <div className="signined">
                        <p>{userInfo.name}</p>
                      </div>
                      <MyPopover
                        className="ui-popover-logined"
                        show={this.state.openPopover}
                      >
                        {availableMenus &&
                          availableMenus.includes('update-info') && (
                            <PopItem
                              linkTo={userLinks.update_profile_info}
                              label={t1('profile')}
                              pathIconClass="is-icon-rocket"
                            />
                          )}
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
                          style={this.popItemStyle}
                        >
                          <span style={this.spanStyle}>
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
                {userInfo && userInfo.iid && (
                  <div className="mobile hamburger-btn">
                    <div onClick={this.showMenuResponsive}>
                      <Hamburger style={this.hamburgerStyle} />
                    </div>
                  </div>
                )}
                <ul
                  className={`mobile  ${this.getContentClass(
                    this.state.isShow,
                  )}`}
                >
                  {userInfo && userInfo.iid && (
                    <li onClick={this.handleCloseMenu}>
                      <Link to="/dashboard" title="">
                        {t1('dashboard')}
                      </Link>
                    </li>
                  )}
                  {hasSystemRole && (
                    <li onClick={this.handleCloseMenu}>
                      <Link to="/admin" title="">
                        {t1('admin')}
                      </Link>
                    </li>
                  )}
                  {hasStaffRole && (
                    <li onClick={this.handleCloseMenu}>
                      <Link to="/admin" title="">
                        {t1('admin')}
                      </Link>
                    </li>
                  )}
                  {userInfo && userInfo.iid && (
                    <li onClick={this.handleCloseMenu}>
                      <Link to={userLinks.update_profile_info} title="">
                        {t1('profile')}
                      </Link>
                    </li>
                  )}
                  {userInfo && userInfo.iid && (
                    <li onClick={this.handleCloseMenu}>
                      <a title="" onClick={() => this.logoutAction()}>
                        {t1('logout')}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {(this.state.isShow || this.state.openPopover) && (
          <div
            className="div-close-popup-menu"
            onClick={this.handleCloseMenu}
          />
        )}
      </div>
    );
  }
}

const getAvailableMenus = (state) =>
  state.domainInfo &&
  state.domainInfo.school &&
  state.domainInfo.school[
    Perm.hasPerm('teacher')
      ? 'teacher_dashboard_menus'
      : 'student_dashboard_menus'
  ];

const availableMenusSelector = createSelector(
  getAvailableMenus,
  (availableMenus) => availableMenus,
);

const mapStateToProp = (state) => ({
  userInfo: state.user && state.user.info,
  domainSchool: state.domainInfo && state.domainInfo.domain,
  themeConfig: getThemeConfig(state),
  availableMenus: availableMenusSelector(state),
});

export default connect(mapStateToProp)(withRouter(Menu));
