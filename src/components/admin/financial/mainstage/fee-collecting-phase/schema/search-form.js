import { t1 } from 'translate';
import { constants, UiLibs } from 'configs/constants';
import { dateGreaterThan, dateLessThan } from 'common/validators';
import DatePicker from 'schema-form/elements/date-picker';

const schema = (formid, values = {}) => ({
  start_date: {
    type: DatePicker,
    uiLib: UiLibs.ANT,
    getStartDate: true,
    classWrapper: 'col-md-6',
    validate: [
      dateLessThan(values.end_date, t1('start_date_must_be_before_end_date')),
    ],
    floatingLabelText: t1('start_date_requested'),
    fullWidth: true,
    maxDate: values.end_date,
  },
  end_date: {
    classWrapper: 'col-md-6',
    type: DatePicker,
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
  text: {
    classWrapper: 'col-md-8',
    type: 'text',
    floatingLabelText: t1('name'),
    // defaultValue: 'name',
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  status: {
    classWrapper: 'col-md-4',
    type: 'multiCheckbox',
    options: constants.StatusOptions(),
    defaultValue: ['approved', 'queued'],
    inline: true,
    floatingLabelText: t1('status'),
    floatingLabelFixed: false,
  },
});

const ui = () => [
  {
    id: 'id',
    fields: ['start_date', 'end_date', 'text', 'status'],
  },
];

export default {
  schema,
  ui,
};
