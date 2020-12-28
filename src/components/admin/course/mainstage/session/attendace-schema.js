import { t1 } from 'translate';
import { attendanceStatusOptions, attenStatus } from 'configs/constants';
import get from 'lodash.get';
import { required } from 'common/validators';

const schema = (formid, values, absenceResions) => ({
  status: {
    type: 'radio',
    label: t1('status'),
    fullWidth: true,
    multiline: true,
    options: attendanceStatusOptions(),
  },
  note: {
    type: 'select',
    label: t1('note'),
    fullWidth: true,
    inline: true,
    options: absenceResions,
    validate: [required(t1('cannot_be_empty'))],
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'default',
      fields:
        get(values, 'status') === attenStatus.ATTENDANCE_ALLOWED_LEAVE_STATUS
          ? ['status', 'note']
          : ['status'],
    },
  ];
};
export default (absenceResions) => ({
  schema: (formid, values) => schema(formid, values, absenceResions),
  ui,
});
