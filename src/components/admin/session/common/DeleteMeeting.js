import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import Icon from 'components/common/Icon/index';
import apiUrls from '../endpoints/index';
import Request from 'common/network/http/Request';

class DeleteMeeting extends Component {
  deleteMeeting = (sessionIid) => {
    const params = {
      session_iid: sessionIid,
      is_course_admin: 1,
    };
    const { dispatch } = this.props;

    Request.post(apiUrls.delete_meeting, params).then((res) => {
      if (res.success) {
      } else alert(t1('delete_meeting_failed'));
    });
  };

  render() {
    const { session } = this.props;

    return (
      <Icon
        icon="cancel"
        onClick={() => {
          this.deleteMeeting(session.iid);
        }}
        title={t1('delete_meeting')}
      />
    );
  }
}

export default connect()(DeleteMeeting);
