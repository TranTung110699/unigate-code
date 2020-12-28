/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { t1 } from 'translate';
import UserInfo from '../BasicUserInfo';
import UserRoles from '../UserRoles';
import TeacherReport from './reports';
import ContractsInfo from './ContractsInfo';
import Widget from 'components/common/Widget';

class ViewTeacherDashboard extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Widget title={t1('user_basic_info')}>
              <UserInfo user={user} />
            </Widget>
          </div>

          <div className="col-md-3">
            <Widget title={t1('contracts_info')}>
              <ContractsInfo user={user} />
            </Widget>
          </div>

          <div className="col-md-3">
            <Widget title={t1('trainer_roles')}>
              <UserRoles user={user} />
            </Widget>
          </div>

          <div className="col-md-3">
            <Widget title={t1('teacher_reports')}>
              <TeacherReport user={user} />
            </Widget>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewTeacherDashboard;
