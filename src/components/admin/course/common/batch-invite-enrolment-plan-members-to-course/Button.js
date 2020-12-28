import React from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import ApiRequestBtnWithConfirmDialog from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import lodashGet from 'lodash.get';

const Button = ({ course, inviteSuccessFull }) => {
  return (
    <ApiRequestBtnWithConfirmDialog
      renderComponent={({ onClick }) => {
        return (
          <RaisedButton
            primary
            icon={<Icon icon="add" style={{ color: 'white' }} />}
            label={t1('invite_all_enrolment_plan_members')}
            className="m-l-10 m-r-10"
            onClick={onClick}
          />
        );
      }}
      url={epApiUrls.invite_all_enrolment_plan_members_to_course}
      params={{
        course_iid: lodashGet(course, 'iid'),
      }}
      onRequestSuccessful={inviteSuccessFull}
      textConfirm={t1(
        'do_you_want_to_add_all_members_of_enrolment_plan_to_course?',
      )}
    />
  );
};

export default Button;
