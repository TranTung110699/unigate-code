import React, { Component } from 'react';
import { t1 } from 'translate';
import NewForm from 'components/admin/course/new/Form';
import EditAvatar from 'components/admin/node/edit/EditAvatar';
import { CourseActions } from 'configs/constants/permission';
import Widget from 'components/common/Widget';
import { isExamShift, isOfflineExam } from 'common/learn';

class CourseEditInfo extends Component {
  render() {
    const { course, hasPermission, permissions } = this.props;

    let step = '';
    if (isExamShift(course)) {
      step = 'exam_shift';
    }
    if (isOfflineExam(course)) {
      step = 'offline_exam';
    }

    return (
      <div>
        <NewForm
          node={course}
          mode="edit"
          step={step}
          title={t1('update_course')}
          hasPermission={hasPermission}
          permissions={permissions}
        />
        <div>
          <Widget title={t1('edit_course_avatar')}>
            <EditAvatar
              node={course}
              readOnly={
                !hasPermission ||
                !hasPermission(
                  CourseActions.COURSE_ACTION_UPDATE,
                  course && course.iid,
                  permissions,
                )
              }
            />
          </Widget>
        </div>
      </div>
    );
  }
}

export default CourseEditInfo;
