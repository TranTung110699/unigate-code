import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';
import { logout } from 'actions/auth';
import {
  activeLoginTab,
  activeRegisterTab,
  openLoginDialog,
} from 'actions/auth/auth-dialog';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import debounce from 'lodash.debounce';
import Perm from 'common/utils/Perm';
import PropTypes from 'prop-types';
import { t1, t4 } from 'translate';
import { getOptionsPropertiesLogin } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';

import FlatButton from 'components/common/mui/FlatButton';
import Search from './search';
import mailIcon from './images/ic-mail.png';
import phoneIcon from './images/ic-phone.png';
import registerIcon from './images/ic-register.png';
import signInIcon from './images/ic-sign-in.png';
import MenuDailyTip from './daily-tips-menu/index';

import './stylesheet.scss';

class Menu extends React.Component {
  imgStyle = { marginTop: '-3px' };
  imgStyle1 = { marginTop: '-2px' };
  imgStyle2 = { marginTop: '-4px' };
  flatButtonStyle = {
    width: '50px',
    height: '50px',
    minWidth: '50px',
    color: '#242c42',
    background: 'transparent',
  };
  divStyle = { paddingLeft: 0, height: 'auto', lineHeight: 'unset !important' };
  aStyle = { color: 'white' };

  constructor(props) {
    super(props);
    this.state = {
      openPopover: false,
      isShow: false,
      searchText: '',
      shouldShowDropdownHomeCourses: false,
      shouldShowDropdownDailyTips: false,
    };
  }

  componentWillMount() {
    this.delayedCallback = debounce((event) => {
      this.searchCourses();
    }, 1000);
  }

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

  showMenuResponsive = () => {
    this.setState((prevState) => ({ isShow: !prevState.isShow }));
  };

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
  handleCloseMenu = () => {
    this.setState({ isShow: false, shouldShowDropdownDailyTips: false });
  };
  handleDropdownDailyTips = () => {
    this.setState({
      shouldShowDropdownDailyTips: !this.state.shouldShowDropdownDailyTips,
    });
  };

  render() {
    const { userInfo, domainSchool, themeConfig, enableRegisters } = this.props;

    let hasStaffRole = false;
    let hasSystemRole = false;
    if (domainSchool) {
      hasSystemRole = Perm.hasPerm('root', 'system');
      if (!hasSystemRole) {
        hasStaffRole = Perm.hasPerm('staff');
      }
    }

    return (
      <div className="menu-top-wrapper container">
        <div className="row">
          <div className="top-wrapper">
            <div className="top-left-wrapper">
              <div className="item">
                <img src={phoneIcon} alt="" style={this.imgStyle} />
              </div>
              <div className="item item-group">024 2244 6868</div>
              <div className="item">
                <img src={mailIcon} alt="" style={this.imgStyle1} />
              </div>
              <div className="item item-group">
                <a style={this.aStyle} href="mailto:support@vieted.com">
                  support@vieted.com
                </a>
              </div>
              {/* <div className="item"><img src={fbIcon} alt="" /></div> */}
              {/* <div className="item"><img src={googleIcon} alt="" /></div> */}
              {/* <div className="item"><img src={ytbIcon} alt="" /></div> */}
            </div>
            <div className="top-right-wrapper">
              <div className="item">
                <img src={signInIcon} alt="" style={this.imgStyle2} />
              </div>
              {(!userInfo || !userInfo.iid) && (
                <div
                  className="item item-group action"
                  onClick={this.onShowLoginPopup}
                >
                  {t4('login')}
                </div>
              )}
              {userInfo && userInfo.iid && (
                <div className="item item-group">{userInfo.name}</div>
              )}
              {userInfo && userInfo.iid && hasStaffRole && (
                <Link className="item item-group" to="/admin">
                  {t1('admin')}
                </Link>
              )}
              {(!userInfo || !userInfo.iid) &&
                enableRegisters &&
                enableRegisters.includes('normal_register') && [
                  <div className="item">
                    <img src={registerIcon} alt="" style={this.imgStyle2} />
                  </div>,
                  <div
                    className="item item-group action"
                    onClick={this.onShowRegisterPopup}
                  >
                    {t4('register')}
                  </div>,
                ]}
              {userInfo &&
                userInfo.iid && [
                  <div className="item">
                    <img src={registerIcon} alt="" style={this.imgStyle2} />
                  </div>,
                  <div
                    className="item item-groupl action"
                    onClick={this.logoutAction}
                  >
                    {t4('logout')}
                  </div>,
                ]}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="header-wrapper">
            <div className="header-left">
              <Link to={'/'}>
                <img src={themeConfig.logo} alt="" />
              </Link>
            </div>
            <div className="item etec-menu-responsive">
              <FlatButton
                onClick={this.showMenuResponsive}
                style={this.flatButtonStyle}
                icon={<i className="material-icons">menu</i>}
              />
            </div>
            <div
              id="menu-responsive"
              className={`menus ${
                this.state.isShow ? 'show-menus' : 'hide-menus'
              }`}
            >
              <div className="item">
                <Link
                  onClick={this.handleCloseMenu}
                  to={getFrontendUrl('tests', { type: 'exam_path' })}
                >
                  {t1('exam')}
                </Link>
              </div>
              <div className="item">
                <Link
                  onClick={this.handleCloseMenu}
                  to={getFrontendUrl('tests', { type: 'path', iid: 61886 })}
                >
                  {t1('study')}
                </Link>
              </div>
              {userInfo && userInfo.iid && (
                <Link className="item item-group" to="/skills">
                  {t1('your_skills')}
                </Link>
              )}
              <div className="item" style={this.divStyle}>
                <MenuDailyTip
                  shouldShowDropdownDailyTips={
                    this.state.shouldShowDropdownDailyTips
                  }
                  onHandleDropdownDailyTips={this.handleDropdownDailyTips}
                />
              </div>
              <div className="item">
                <Link onClick={this.handleCloseMenu} to={getFrontendUrl('faq')}>
                  {t1('faq')}
                </Link>
              </div>
              {userInfo && userInfo.iid && (
                <div className="item">
                  <Link
                    onClick={this.handleCloseMenu}
                    to={getFrontendUrl('pay')}
                  >
                    {t1('pay')}
                  </Link>
                </div>
              )}
              <Search
                className="item"
                onClick={() => {
                  this.setState({ shouldShowDropdownDailyTips: false });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  const keyState = 'homeSearchedCourses';
  const searchedCourses = state.dataApiResults[keyState];

  return {
    keyState,
    searchedCourses,
    userInfo: state.user.info,
    enableRegisters:
      state.domainInfo &&
      state.domainInfo.conf &&
      state.domainInfo.conf.enable_registers,
    domainSchool: state.domainInfo.domain || false,
    themeConfig: getThemeConfig(state),
  };
};

Menu.propTypes = {
  userInfo: PropTypes.instanceOf(Object),
  domainSchool: PropTypes.string,
};

Menu.defaultProps = {
  userInfo: null,
  domainSchool: null,
};

export default connect(mapStateToProp)(withRouter(Menu));
