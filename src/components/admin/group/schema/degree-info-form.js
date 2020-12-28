import { t1 } from 'translate/index';
import getLodash from 'lodash.get';
import { dateGreaterThan, dateLessThan, required } from 'common/validators';
import { convertBooleanValueToInt } from 'common/normalizers';
import DatePicker from 'schema-form/elements/date-picker';

const defaultDate = Math.round(new Date().getTime() / 1000);
const schema = (formid, values) => ({
  decision_number: {
    type: 'text',
    floatingLabelText: `${t1('decision_number')} (*)`,
    floatingLabelFixed: true,
    validate: [required(t1('decision_number_cannot_be_empty'))],
    fullWidth: true,
  },
  has_received_original_degree: {
    type: 'checkbox',
    label: t1('has_received_original_degree'),
    fullWidth: true,
    defaultValue: 1,
    normalize: convertBooleanValueToInt,
  },
  sign_number: {
    type: 'text',
    floatingLabelText: `${t1('sign_number')} (*)`,
    floatingLabelFixed: true,
    validate: [required(t1('sign_number_cannot_be_empty'))],
    fullWidth: true,
  },
  has_received_clone_degree: {
    type: 'checkbox',
    label: t1('has_received_clone_degree'),
    fullWidth: true,
    defaultValue: 1,
    normalize: convertBooleanValueToInt,
  },
  number_of_clone_degree: {
    type: 'number',
    min: 1,
    hintText: t1('number_of_clone_degree'),
    floatingLabelText: t1('number_of_clone_degree'),
    errorText: '',
    fullWidth: true,
  },
  date_of_issue: {
    type: DatePicker,
    floatingLabelText: `${t1('date_of_issue')} (*)`,
    hintText: t1('date_of_issue'),
    defaultValue: defaultDate,
    fullWidth: true,
    validate: [
      required(t1('date_of_issue_cannot_be_empty')),
      dateLessThan(
        values.delivery_date,
        t1('date_of_issue_must_be_less_than_delivery_date'),
      ),
    ],
  },
  delivery_date: {
    type: DatePicker,
    floatingLabelText: `${t1('delivery_date')} (*)`,
    hintText: t1('delivery_date'),
    fullWidth: true,
    defaultValue: defaultDate,
    validate: [
      required(t1('delivery_date_cannot_be_empty')),
      dateGreaterThan(
        getLodash(values, 'degree_info.date_of_issue'),
        t1('delivery_date_must_be_greater_than_date_of_issue'),
      ),
    ],
  },
});

const ui = (step, values) => [
  {
    fields: [
      'decision_number',
      'has_received_original_degree',
      'sign_number',
      'has_received_clone_degree',
      ...(getLodash(values, 'degree_info.has_received_clone_degree') === 1
        ? ['number_of_clone_degree']
        : []),
      'date_of_issue',
      'delivery_date',
    ],
    id: 'default',
  },
];

export default { schema, ui };
