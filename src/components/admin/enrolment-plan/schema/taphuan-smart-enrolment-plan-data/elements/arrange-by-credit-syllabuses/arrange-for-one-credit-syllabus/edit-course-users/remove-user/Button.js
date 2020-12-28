import lodashGet from 'lodash.get';
import ApiRequestBtnWithConfirmDialog from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import { t1 } from 'translate';
import { taphuanSmartEnrolmentPlanApi } from 'components/admin/enrolment-plan/endpoints';
import React from 'react';

const RemoveUser = ({ formid, user, course }) => {
  const userIid = lodashGet(user, 'iid');
  const courseIid = lodashGet(course, 'iid');

  return (
    <ApiRequestBtnWithConfirmDialog
      textConfirm={t1('do_you_want_to_remove_this_user_from_course?')}
      formidToSubmitOnSuccess={formid}
      url={taphuanSmartEnrolmentPlanApi.remove_course_users}
      params={{
        user_iid: userIid,
        course_iid: courseIid,
      }}
      icon="delete"
    />
  );
};

export default RemoveUser;
