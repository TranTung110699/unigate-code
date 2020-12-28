import MyPopover from 'components/common/views/popover';
import PopItem from 'components/common/views/popover/Item';
import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import {
  activeLoginTab,
  activeRegisterTab,
  openLoginDialog,
} from 'actions/auth/auth-dialog';
import { Link } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';
import { logout } from 'actions/auth';
import SvgIcon, {
  logoutIcon,
  profileIcon,
  settingIcon,
  upgradeIcon,
} from 'common/icons/svg';
import configs from 'configs/configuration';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 06/04/2017
 **/
class TopMenuApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopover: false,
    };
    this.handleOnOpenPopover = this.handleOnOpenPopover.bind(this);
    this.hiddenPopover = this.hiddenPopover.bind(this);
    this.onShowRegisterPopup = this.onShowRegisterPopup.bind(this);
    this.onShowLoginPopup = this.onShowLoginPopup.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    window.rootAppContainer.addEventListener('click', this.hiddenPopover);
  }

  componentWillUnmount() {
    window.rootAppContainer.removeEventListener('click', this.hiddenPopover);
  }

  hiddenPopover() {
    this.setState({
      openPopover: false,
    });
  }

  handleOnOpenPopover() {
    const { openPopover } = this.state;
    const newState = !openPopover;
    this.setState({
      openPopover: newState,
    });
  }

  onShowLoginPopup() {
    const { dispatch } = this.props;
    dispatch(activeLoginTab());
    dispatch(openLoginDialog());
  }

  onShowRegisterPopup() {
    const { dispatch } = this.props;
    dispatch(openLoginDialog());
    dispatch(activeRegisterTab());
  }

  logout() {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  render() {
    const { userInfo } = this.props;

    return (
      <div className="ui-top-menu clearfix">
        <div className="screen-viewer">
          <div className="pull-left ">
            <div className="center-block-panel">
              <div className="ui-center-block ">
                <ul className="menu-list">
                  <li className="logo">
                    <Link to="/">
                      <img src={configs.defaultLogo} alt="logo" />
                    </Link>
                  </li>
                  <li>
                    <Link to="gioi-thieu">Giới thiệu</Link>
                  </li>
                  <li>
                    <Link to="gioi-thieu">Hướng dẫn</Link>
                  </li>
                  <li>
                    <Link to={getFrontendUrl('course_list')}>
                      {t1('courses')}
                    </Link>
                  </li>
                  <li>
                    <Link to="gioi-thieu">Liên hệ</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pull-right">
            <div className="center-block-panel">
              {userInfo && userInfo.iid && (
                <div className="signined">
                  <span className="login-name m-r-10">{userInfo.name}</span>
                  <span
                    onClick={this.handleOnOpenPopover}
                    className="profile-icon-panel"
                  >
                    <SvgIcon
                      path={profileIcon}
                      className="is-icon-profile-1-1 profile-icon"
                      viewBox="0 0 512 512"
                    />

                    <MyPopover show={this.state.openPopover}>
                      <PopItem
                        label={t1('Tài khoản')}
                        path={settingIcon}
                        pathIconClass="is-icon-setting-gear-1"
                      />
                      <PopItem
                        label={t1('admin')}
                        path={upgradeIcon}
                        pathIconClass="is-icon-rocket"
                      />
                      <PopItem
                        label={t1('logout')}
                        action={this.logout}
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
              )}

              {(!userInfo || !userInfo.iid) && (
                <div>
                  <ul className="register">
                    <li onClick={this.onShowLoginPopup}>Login</li>

                    <li onClick={this.onShowRegisterPopup} className="signup">
                      Sign up free
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// TopMenuApp.propTypes = {
//   userInfo: PropTypes.shape({
//     avatar: PropTypes.string,
//     name: PropTypes.string,
//     // iid: PropTypes.int,
//     // iid: PropTypes.
//     id: PropTypes.string,
//   }),
// };
//
// TopMenuApp.defaultProps = {
//   userInfo: null,
// };

const mapStateToProp = (state) => ({
  userInfo: state.user.info,
});

export default connect(mapStateToProp)(TopMenuApp);
