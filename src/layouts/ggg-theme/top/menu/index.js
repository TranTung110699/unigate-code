import React from 'react';
import { connect } from 'react-redux';
import { t1, t4 } from 'translate';
import { Link, NavLink, withRouter } from 'react-router-dom';
import MyPopover from 'components/common/views/popover';
import { logout } from 'actions/auth';
import { openLoginDialog } from 'actions/auth/auth-dialog';
import PopItem from 'components/common/views/popover/Item';
import Hamburger from 'material-ui/svg-icons/image/dehaze';
import Icon from 'components/common/Icon';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import SvgIcon, { logoutIcon } from 'common/icons/svg';
import debounce from 'lodash.debounce';
import Perm from 'common/utils/Perm';
import Links from 'routes/links';
import { getOptionsPropertiesLogin } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import userLinks from 'routes/links/user';
import DropDownHomeCourses from './DropDownHomeCourses';

import './stylesheet.scss';

class Menu extends React.Component {
  hamburgerStyle = { width: 44, height: 44, color: '#DCAB18' };

  constructor(props) {
    super(props);
    this.state = {
      openPopover: false,
      isShow: false,
      searchText: '',
      shouldShowDropdownHomeCourses: false,
    };
  }

  componentWillMount() {
    this.delayedCallback = debounce((event) => {
      this.searchCourses();
    }, 1000);
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

  searchCourses = () => {
    if (this.state.searchText) {
      const { dispatch, keyState } = this.props;
      const url = apiUrls.search_home_courses;

      dispatch(
        sagaActions.getDataRequest(
          { url, keyState },
          { q: this.state.searchText },
        ),
      );
      this.setState({ shouldShowDropdownHomeCourses: true });
    } else {
      this.setState({ shouldShowDropdownHomeCourses: false });
    }
  };

  goToSearchCoursesPage = () => {
    if (this.state.searchText) {
      const { history } = this.props;

      history.push(Links.searchCourses(this.state.searchText));
    }
  };

  resetDropdownHomeCourses = () => {
    this.setState({ shouldShowDropdownHomeCourses: false });
  };

  searchTextOnChange = (event) => {
    this.setState({ searchText: event.target.value });
    event.persist();
    this.delayedCallback(event);
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.goToSearchCoursesPage();
    }
  };

  render() {
    const { userInfo, domainSchool, themeConfig } = this.props;

    let hasStaffRole = false;
    let hasSystemRole = false;
    if (domainSchool) {
      hasSystemRole = Perm.hasPerm('root', 'system');
      if (!hasSystemRole) {
        hasStaffRole = Perm.hasPerm('staff');
      }
    }

    return (
      <div className="menu-top-wrapper">
        <div className="menu-top">
          <div className="container">
            <div className="row">
              <div className="logo left">
                <Link to="/" title={t1('homepage')}>
                  <img src={themeConfig.logo} alt="" />
                </Link>
              </div>
              <div className="navigation">
                <ul className="navigation-bar screen">
                  {userInfo && userInfo.iid && (
                    <li>
                      <NavLink to="/dashboard" title="" className="nav-link">
                        {t1('course')}
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
                        <p className="nav-link">{userInfo.name}</p>
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
                </div>
                <ul
                  className={`mobile ${this.getContentClass(
                    this.state.isShow,
                  )}`}
                >
                  {userInfo && userInfo.iid && (
                    <li>
                      <NavLink to="/dashboard" title="" className="nav-link">
                        {t1('course')}
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
                      <a onClick={this.onShowLoginPopup}>{t1('login')}</a>
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
              <div className="courses-search-form">
                <input
                  className="search-text"
                  value={this.state.searchText}
                  onKeyPress={this.handleKeyPress}
                  onChange={this.searchTextOnChange}
                  placeholder={t4('search')}
                />
                <div
                  className="search-btn"
                  onClick={() => this.goToSearchCoursesPage()}
                >
                  <Icon icon="search" className="search-icon" />
                </div>
                {this.state.shouldShowDropdownHomeCourses && (
                  <DropDownHomeCourses
                    {...this.props}
                    resetDropdownHomeCourses={this.resetDropdownHomeCourses}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  const keyState = 'homeSearchedCourses';
  const searchedCourses = state.dataApiResults[keyState] || [];

  return {
    keyState,
    searchedCourses,
    userInfo: state.user.info,
    domainSchool: state.domainInfo.domain || false,
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProp)(withRouter(Menu));
