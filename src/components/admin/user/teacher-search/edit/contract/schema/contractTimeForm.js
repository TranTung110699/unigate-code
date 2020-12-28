import { t1 } from 'translate';
import { daysOfWeek } from 'components/timetable_v2/utils/DateUtils';
import LayoutFreeStyle from './layout-contract-time-free-style';
import TimePicker from 'schema-form/elements/time-picker';

const schema = {
  days_of_week: {
    type: 'multiCheckbox',
    inline: true,
    fullWidth: true,
    floatingLabelText: t1('days_of_week'),
    options: Object.keys(daysOfWeek).map((key) => ({
      value: parseInt(key),
      label: daysOfWeek[key] && daysOfWeek[key].label,
    })),
  },
  start_time: {
    type: TimePicker,
    floatingLabelText: t1('start_time'),
    dailyUnix: true,
  },
  end_time: {
    type: TimePicker,
    floatingLabelText: t1('end_time'),
    dailyUnix: true,
  },
};

const ui = () => [
  {
    id: 'default',
    fields: ['days_of_week', 'start_time', 'end_time'],
  },
];

const layout = { component: LayoutFreeStyle, freestyle: 1 };

export default { schema, ui, layout };
