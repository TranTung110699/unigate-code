import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t3 } from 'translate';
import { courseModes, inviteActions } from 'configs/constants';
import { handleInviteCourseRequest } from 'actions/learn/saga-creators';

class CourseInviteStatus extends Component {
  getModeAfterInviteWithAction = (action) => {
    switch (action) {
      case inviteActions.ACTION_ACCEPT:
        return courseModes.MODE_IN_PROGRESS;
      case inviteActions.ACTION_REJECT:
        return courseModes.MODE_REJECTED;
      case inviteActions.ACTION_DELETE:
        return courseModes.MODE_DELETED;
      default:
        return;
    }
  };

  handleInviteAction = (item, action) => {
    const { dispatch } = this.props;
    const params = { item: item.iid, act: action };
    dispatch(
      handleInviteCourseRequest(params, () => {
        this.setState({
          mode: this.getModeAfterInviteWithAction(action),
        });
      }),
    );
  };

  render() {
    const { mode, item } = this.props;
    switch (mode) {
      case courseModes.MODE_DELETED:
        return (
          <div className="deleted-action">
            <p className="deleted">{t3('deleted')}</p>
          </div>
        );
        break;
      case courseModes.MODE_REJECTED:
        return (
          <div className="rejected-action">
            <button
              className="delete-btn"
              onClick={() =>
                this.handleInviteAction(item, inviteActions.ACTION_DELETE)
              }
            >
              {t3('delete')}
            </button>
            <button
              className="join-btn"
              onClick={() =>
                this.handleInviteAction(item, inviteActions.ACTION_ACCEPT)
              }
            >
              {t3('join')}
            </button>
          </div>
        );
        break;
      case courseModes.MODE_ASSIGNED:
        return (
          <div className="assigned-action">
            <button
              className="reject-btn"
              onClick={() =>
                this.handleInviteAction(item, inviteActions.ACTION_REJECT)
              }
            >
              {t3('reject')}
            </button>
            <button
              className="join-btn"
              onClick={() =>
                this.handleInviteAction(item, inviteActions.ACTION_ACCEPT)
              }
            >
              {t3('join')}
            </button>
          </div>
        );
        break;
    }

    return null;
  }
}

export default connect()(CourseInviteStatus);
