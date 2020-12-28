import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Perm from 'common/utils/Perm';
import { logout } from 'actions/auth';
import { t1, t3 } from 'translate';
import { getThemeConfig } from 'utils/selectors';

import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 **/
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openPopover: false };
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

    const hasStaffRole = domainSchool && Perm.hasPerm('staff');
    const hasSystemRole = domainSchool && Perm.hasPerm('root', 'system');

    return (
      <div className={`ui-main-menu ${menuItemPanelClass}`}>
        <div className="ui-nav-menu clearfix">
          <div className="pull-left">
            <Link to="/">
              {type && type === 'fly' && (
                <img
                  src={themeConfig.black_logo}
                  title="logo"
                  className="logo"
                />
              )}
              {(!type || type !== 'fly') && (
                <img src={themeConfig.logo} title="logo" className="logo" />
              )}
            </Link>
          </div>
          <div className=" pull-right">
            <ul className={`ui-top-menu-panel ${menuItemPanelClass}`}>
              {(!userInfo || !userInfo.iid) && (
                <li>
                  <Link to="/">{t1('home')}</Link>
                </li>
              )}
              {userInfo && userInfo.iid && (
                <li>
                  <Link to="/dashboard">{t1('dashboard')}</Link>
                </li>
              )}
              <li>
                <Link to="/faq">{t3('faq')}</Link>
              </li>
              {hasSystemRole && (
                <li>
                  <Link to="/system">{t1('system')}</Link>
                </li>
              )}
              {hasStaffRole && (
                <li>
                  <Link to="/admin">{t1('admin')}</Link>
                </li>
              )}
              {userInfo && userInfo.iid && (
                <li>
                  <a onClick={this.logoutAction} className="logout">
                    {t1('logout')}
                  </a>
                </li>
              )}
            </ul>
          </div>
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
