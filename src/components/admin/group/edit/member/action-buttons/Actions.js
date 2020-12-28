import React from 'react';
import { isEnrolmentPlanGroup } from 'components/admin/node/utils';
import UpdateMembership from './UpdateMembership';
import { t1 } from '../../../../../../translate';
import selectedUsersModes from './configs';
import { shouldShowAdd, shouldShowRemove } from '../utils';

const generateLabel = (props, mode = 'add') => {
  const { selectedUsersMode, total, group } = props;

  let label;

  if (selectedUsersMode === selectedUsersModes.PERFORM_ON_ONE_USER) {
    label =
      mode === 'add' ? t1('add_user_to_group') : t1('remove_user_from_group');
  } else if (
    selectedUsersMode ===
    selectedUsersModes.PERFORM_ON_MULTIPLE_SELECTED_MEMBERS
  ) {
    if (isEnrolmentPlanGroup(group)) {
      label =
        mode === 'add'
          ? t1('add_selected_to_enrolment_plan')
          : t1('remove_selected_from_enrolment_plan');
    } else {
      label =
        mode === 'add'
          ? t1('add_selected_to_group')
          : t1('remove_selected_from_group');
    }
  } else {
    label =
      mode === 'add'
        ? t1('add_all_%d_users', [total])
        : t1('remove_all_%d_users', [total]);
  }

  return label;
};

class GroupMembersActions extends React.Component {
  render() {
    const { action, subAction } = this.props;

    return (
      <span>
        {shouldShowAdd(action, subAction) ? (
          <UpdateMembership
            {...this.props}
            className={'m-r-10'}
            primary
            mode="add"
            label={generateLabel(this.props, 'add')}
          />
        ) : (
          ''
        )}
        {shouldShowRemove(action, subAction) ? (
          <UpdateMembership
            {...this.props}
            primary
            className={'m-r-10'}
            mode="remove"
            label={generateLabel(this.props, 'remove')}
          />
        ) : null}
      </span>
    );
  }
}

export default GroupMembersActions;
