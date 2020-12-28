import { t1 } from 'translate';
import DatePicker from 'schema-form/elements/date-picker';
import { dateGreaterThan, dateLessThan, required } from 'common/validators';

const schema = (values) => ({
  from_time: {
    type: DatePicker,
    getStartDate: true,
    validate: [
      required(t1('start_time_cannot_be_empty')),
      dateLessThan(values.end_time, t1('start_time_must_be_before_end_time')),
    ],
    hintText: t1('start_time'),
    floatingLabelText: t1('start_time'),
    fullWidth: true,
  },
  to_time: {
    type: DatePicker,
    getEndDate: true,
    validate: [
      required(t1('end_time_cannot_be_empty')),
      dateGreaterThan(
        values.start_time,
        t1('end_time_must_be_after_start_time'),
      ),
    ],
    hintText: t1('end_time'),
    floatingLabelText: t1('end_time'),
    fullWidth: true,
  },
});

const ui = (step, values) => [
  {
    id: 'id',
    fields: ['from_time', 'to_time'],
  },
];

export default { schema, ui };
