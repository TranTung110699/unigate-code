import { dateGreaterThan, dateLessThan, required } from 'common/validators';
import { UiLibs } from 'configs/constants';
import { t1 } from 'translate';
import DateTimePicker from 'schema-form/elements/date-time-picker';

export default (values) => ({
  type: 'section',
  classWrapper: 'row',
  schema: {
    schema: {
      iid: {
        type: 'number',
        classWrapper: 'display-none',
      },
      start_time: {
        type: DateTimePicker,
        uiLib: UiLibs.ANT,
        minDate: new Date(),
        classWrapper: 'col-md-6',
        validate: [
          dateLessThan(
            values.end_date,
            t1('start_time_must_be_before_end_date'),
          ),
          required(t1('start_time_cannot_be_empty')),
        ],
        floatingLabelText: t1('start_time_requested'),
        fullWidth: true,
      },
      end_time: {
        type: DateTimePicker,
        uiLib: UiLibs.ANT,
        classWrapper: 'col-md-6',
        minDate: new Date(),
        floatingLabelText: t1('end_time_requested'),
        validate: [
          dateGreaterThan(
            values.start_date,
            t1('end_time_must_be_after_start_time'),
          ),
          required(t1('end_time_cannot_be_empty')),
        ],
        fullWidth: true,
      },
    },
    ui: () => [
      {
        id: 'register_credit_syllabus',
        fields: ['iid', 'start_time', 'end_time'],
      },
    ],
  },
});
