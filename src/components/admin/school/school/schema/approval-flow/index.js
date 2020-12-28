/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import { syllabusStatuses } from 'configs/constants';

const schema = () => ({
  code: {
    type: 'select',
    hintText: t1('from_status'),
    floatingLabelText: t1('from_status'),
    defaultValue: '',
    fullWidth: true,
    options: syllabusStatuses(),
  },
  approval_action: {
    type: 'select',
    hintText: t1('when_approved_status_will_change_to'),
    floatingLabelText: t1('when_approved_status_will_change_to'),
    defaultValue: '',
    fullWidth: true,
    options: syllabusStatuses(),
  },
  reject_action: {
    type: 'select',
    hintText: t1(
      'when_rejected_status_will_change_to(leave_empty_if_not_applicable)',
    ),
    floatingLabelText: t1(
      'when_rejected_status_will_change_to(leave_empty_if_not_applicable)',
    ),
    defaultValue: '',
    fullWidth: true,
    options: syllabusStatuses(),
  },
});

const ui = () => [
  {
    id: 'approval_flow',
    fields: ['code', 'approval_action', 'reject_action'],
  },
];

export default { schema, ui };
