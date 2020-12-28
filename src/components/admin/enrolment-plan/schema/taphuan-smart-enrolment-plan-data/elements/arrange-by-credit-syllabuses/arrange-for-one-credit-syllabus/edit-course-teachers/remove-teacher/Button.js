import lodashGet from 'lodash.get';
import ApiRequestBtnWithConfirmDialog from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import { t1 } from 'translate';
import { taphuanSmartEnrolmentPlanApi } from 'components/admin/enrolment-plan/endpoints';
import React from 'react';

const RemoveTeacher = ({ formid, user, course }) => {
  const userIid = lodashGet(user, 'iid');
  const courseIid = lodashGet(course, 'iid');

  return (
    <ApiRequestBtnWithConfirmDialog
      textConfirm={t1('do_you_want_to_remove_this_teacher_from_course?')}
      formidToSubmitOnSuccess={formid}
      url={taphuanSmartEnrolmentPlanApi.remove_course_teachers}
      params={{
        user_iid: userIid,
        course_iid: courseIid,
      }}
      icon="delete"
    />
  );
};

export default RemoveTeacher;
