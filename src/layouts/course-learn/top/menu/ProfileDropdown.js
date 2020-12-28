import React, { Component } from 'react';
import { t1 } from 'translate';
import { NavLink } from 'react-router-dom';
import MyPopover from 'components/common/views/popover';
import Avatar from 'components/common/avatar/index';
import PopItem from 'components/common/views/popover/Item';
import SvgIcon, { logoutIcon } from 'common/icons/svg';
import Perm from 'common/utils/Perm';
import { getDashboardUrl } from 'routes/links/common';
import Store from 'store';
import { logout } from 'actions/auth';
import BadgeContainer from '../badge/index';
import userLinks from 'routes/links/user';

const style = {
  drop_down: {
    transform: 'rotate(45deg)',
    fontSize: '8px',
    top: '-2px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

class ProfileDropdown extends Component {
  popItemStyle = { cursor: 'pointer', borderTop: '1px solid #eee' };
  spanStyle = { paddingLeft: '5px', marginLeft: '5px' };

  constructor(props) {
    super(props);
    this.state = {
      openPopover: false,
    };
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
      this.handleCloseMenu();
    }
  };

  handleOnOpenPopover = () => {
    this.setState((prevState) => ({ openPopover: !prevState.openPopover }));
  };

  handleCloseMenu = () => {
    this.setState({
      openPopover: false,
    });
  };

  logoutAction = () => {
    Store.dispatch(logout());
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
      <div className="profile-navigation" ref={this.setWrapperRef}>
        <ul className="profile-dropdown-menu navigation-bar screen">
          <a>
            <BadgeContainer />
          </a>
          {userInfo && userInfo.iid && (
            <div className="user-info" onClick={this.handleOnOpenPopover}>
              <span className="profile-avatar">
                <Avatar user={userInfo} />
                <span
                  className="profile-avatar__name-user"
                  style={this.spanStyle}
                >
                  {userInfo.name}
                </span>
                <i className="mi mi-network-cell" style={style.drop_down} />
              </span>
              <MyPopover
                className="profile-popover"
                show={this.state.openPopover}
              >
                {/* <PopItem
                    className="pop-item"
                    linkTo={`${getProfileUrl('update-profile')}`}
                    label={''}
                  >
                    <div className="profile-popover-avatar">
                      <Avatar user={userInfo} />
                    </div>
                    <span className="profile-username">
                      <p>{userInfo.name}</p>
                      <p style={{ color: '#686f7a' }}>{userInfo.email}</p>
                    </span>
                  </PopItem> */}
                <PopItem
                  className="pop-item"
                  linkTo={userLinks.update_profile_info}
                  label={t1('profile')}
                  onClick={this.handleCloseMenu}
                />

                {hasSystemRole && (
                  <PopItem
                    linkTo="/system"
                    label={t1('system')}
                    pathIconClass="is-icon-rocket"
                    className="pop-item"
                    onClick={this.handleCloseMenu}
                  />
                )}
                {hasStaffRole && (
                  <PopItem
                    linkTo="/admin"
                    label={t1('admin')}
                    pathIconClass="is-icon-rocket"
                    className="pop-item"
                    onClick={this.handleCloseMenu}
                  />
                )}
                <li role="separator" className="divider" />
                <PopItem
                  label={t1('logout')}
                  action={this.logoutAction}
                  style={this.popItemStyle}
                  className="pop-item"
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
            </div>
          )}
        </ul>
      </div>
    );
  }
}

ProfileDropdown.propTypes = {};

export default ProfileDropdown;
