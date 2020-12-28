import React from 'react';
import UpdateBtnWithConfirmDialog from 'components/common/action-button/UpdateBtnWithConfirmDialog';
import Toggle from 'material-ui/Toggle';
import { timeSheetStatuses } from 'configs/constants/timesheet';
import lodashGet from 'lodash.get';

const StatusToggle = ({ node, searchFormId }) => (
  <UpdateBtnWithConfirmDialog
    searchFormId={searchFormId}
    renderComponent={({ onClick }) => (
      <Toggle
        onToggle={onClick}
        toggled={lodashGet(node, 'status') === timeSheetStatuses.APPROVED}
      />
    )}
    noConfirm
    step={'status'}
    iid={lodashGet(node, 'iid')}
    data={{
      status:
        lodashGet(node, 'status') !== timeSheetStatuses.APPROVED
          ? timeSheetStatuses.APPROVED
          : timeSheetStatuses.QUEUED,
      id: lodashGet(node, 'id'),
      ntype: 'time_sheet',
    }}
  />
);

export default StatusToggle;
