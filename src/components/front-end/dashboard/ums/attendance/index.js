import React, { Component } from 'react';
import apiUrls from 'api-endpoints';
import sessionApiUrls from 'components/admin/session/endpoints';
import sagaActions from 'actions/node/saga-creators';
import { connect } from 'react-redux';
import AttendanceLayout from 'components/admin/course/mainstage/attendance/Layout';
import { t1 } from 'translate';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { view: 'month', date: new Date() };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(
      sagaActions.getDataRequest({
        url: sessionApiUrls.get_session_in_current_time,
        keyState: 'sessionAttendance',
      }),
    );
  }

  render() {
    const { session } = this.props;
    if (!session) return <div>{t1('there_is_no_schedule')}</div>;
    return <AttendanceLayout node={session.course} sessionIid={session.iid} />;
  }
}

const mapStateToProps = (state) => {
  const session = state.dataApiResults.sessionAttendance;
  return { session };
};

export default connect(mapStateToProps)(Layout);
