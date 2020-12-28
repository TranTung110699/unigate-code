import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import UpdateAvatar from 'components/user/update/main/avatar';
import './stylesheet.scss';

class AvatarLayout extends Component {
  render() {
    const { user, actionsToDoOnSuccess, requestSuccessful } = this.props;
    if (!user) return null;

    return (
      <div className="user-profile-wrapper">
        <div>
          <div className="col-md-12">
            <h3 className="uppercase">{t1('update_avatar')}</h3>
          </div>
          <UpdateAvatar
            key="avatar"
            user={user}
            actionsToDoOnSuccess={actionsToDoOnSuccess}
            requestSuccessful={requestSuccessful}
          />
        </div>
      </div>
    );
  }
}

export default connect()(AvatarLayout);
