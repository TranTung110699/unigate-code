import { t1 } from 'translate';
import { attendanceStatusOptions, attenStatus } from 'configs/constants';
import get from 'lodash.get';
import { required } from 'common/validators';
import LayoutFreestyle from './LayoutFreestyle';

const schema = (formid, values, absenceReasons) => {
  return {
    status: {
      type: 'radio',
      fullWidth: true,
      inline: true,
      options: attendanceStatusOptions(),
    },
    note: {
      type: 'radio',
      fullWidth: true,
      options: absenceReasons || [],
      validate: [required(t1('cannot_be_empty'))],
    },
  };
};

const ui = (step, values) => {
  return [
    {
      id: 'id',
      fields:
        get(values, 'status') === attenStatus.ATTENDANCE_ALLOWED_LEAVE_STATUS
          ? ['status', 'note']
          : ['status'],
    },
  ];
};
export default (absenceReasons) => ({
  schema: (formid, values) => schema(formid, values, absenceReasons),
  ui,
  layout: {
    component: LayoutFreestyle,
    freestyle: 1,
  },
});
