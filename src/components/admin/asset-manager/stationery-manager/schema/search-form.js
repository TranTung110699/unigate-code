import { t1 } from 'translate';
import { dateGreaterThan, dateLessThan } from 'common/validators';
import { UiLibs } from 'configs/constants';
import SearchFormLayoutFreeStyle from '../freestyle/SearchFormLayoutFreeStyle';
import DateTimePicker from 'schema-form/elements/date-time-picker';

const schema = (formid, values) => ({
  start_date: {
    type: DateTimePicker,
    uiLib: UiLibs.ANT,
    getStartDate: true,
    validate: [
      dateLessThan(values.end_date, t1('start_date_must_be_before_end_date')),
    ],
    floatingLabelText: t1('start_date_requested'),
    fullWidth: true,
    maxDate: values.end_date,
  },
  end_date: {
    type: DateTimePicker,
    uiLib: UiLibs.ANT,
    getEndDate: true,
    floatingLabelText: t1('end_date_requested'),
    validate: [
      dateGreaterThan(
        values.start_date,
        t1('end_date_must_be_after_start_date'),
      ),
    ],
    fullWidth: true,
    minDate: values.start_date,
  },
});

const ui = () => {
  const fields = ['start_date', 'end_date'];

  return [
    {
      id: 'default',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: {
    component: SearchFormLayoutFreeStyle,
    freestyle: 1,
  },
};
