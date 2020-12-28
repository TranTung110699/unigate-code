import React, { Component } from 'react';
import { t1 } from 'translate';
import ViewStudentDashboard from './student';
import ViewTeacherDashboard from './teacher';
import ViewParentDashboard from './parent';
import ViewAccountDashboard from './account';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import UserAvatar from '../edit/avatar';

class ViewUserDashboard extends Component {
  render() {
    const { user, roleUser, isPreviewOnDialog } = this.props;

    let title = '';

    if (roleUser === 'student') title = t1('student_dashboard');
    else if (roleUser === 'teacher') title = t1('teacher_dashboard');
    else if (roleUser === 'parent') title = t1('parent_dashboard');
    else if (roleUser === 'user') title = t1('user_dashboard');

    let content = null;
    if (roleUser === 'student') {
      content = <ViewStudentDashboard {...this.props} />;
    } else if (roleUser === 'parent')
      content = <ViewParentDashboard {...this.props} />;
    else if (roleUser === 'teacher') {
      content = <ViewTeacherDashboard {...this.props} />;
    } else if (roleUser === 'user') {
      content = <ViewAccountDashboard {...this.props} />;
    }

    return (
      <div>
        {/*<h1>{title}</h1>*/}
        {!!isPreviewOnDialog && (
          <div>
            <UserAvatar user={user} roleUser={roleUser} />
          </div>
        )}

        <div>{content}</div>
      </div>
    );
  }
}

export default withSchoolConfigs(ViewUserDashboard);
