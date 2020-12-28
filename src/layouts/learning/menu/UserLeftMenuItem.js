/**
 * Created by Peter Hoang Nguyen on 4/8/2017.
 */
import React from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openLoginDialog } from 'actions/auth/auth-dialog';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 08/04/2017
 **/
class UserLeftMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentsDidMount() {
    const { userInfo } = this.props;
    if (!userInfo || !userInfo.token) {
      const { dispatch } = this.props;
      dispatch(openLoginDialog());
    }
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div className="user-info-panel menu-panel clearfix">
        <div className="user-avatar pull-left">
          <img src={userInfo.avatar} alt="avatar" />
        </div>
        <div className="user-action pull-left">
          <div className="full-name">{userInfo.name}</div>
          <div className="action clearfix">
            <div className="pull-left">
              <i className="status-active" />
              <span className="status-label">{t1('online')}</span>
            </div>
            <div className="pull-right">
              <Link className="user-config" to="/">
                <i className="mi mi-settings" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  userInfo: state.user.info,
});

export default connect(mapStateToProp)(UserLeftMenuItem);
