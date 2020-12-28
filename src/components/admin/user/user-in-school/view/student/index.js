import React, { Component } from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import Transcripts from 'components/front-end/dashboard/ums/transcript/';
import Fee from 'components/front-end/dashboard/ums/fee/';
import BasicUserInfo from '../BasicUserInfo';
import StudentTypes from '../StudentTypes';
import Widget from 'components/common/Widget';

class ViewStudentDashboard extends Component {
  render() {
    const { user, isSIS } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Widget title={t1('user_basic_info')}>
              <BasicUserInfo user={user} />
            </Widget>

            {isSIS && (
              <Widget title={t1('student_types')}>
                <StudentTypes user={user} />
              </Widget>
            )}
          </div>

          {isSIS && [
            <div className="col-md-6">
              <Widget title={t1('student_fee')}>
                <Fee uiid={user.iid} />
              </Widget>
            </div>,
            <div className="col-md-12 m-t-30">
              <Widget title={t1('student_transcripts')}>
                <Transcripts uiid={user.iid} />
              </Widget>
            </div>,
          ]}
        </div>
      </div>
    );
  }
}

export default ViewStudentDashboard;
