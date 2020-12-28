import { t1 } from 'translate';
import { inRange, isNumber, required } from 'common/validators';
import {
  dateToTimestamp,
  timestampToDateString,
  timestampToDateTimeString,
} from 'common/utils/Date';
import { semesterTypes } from 'configs/constants';
import { change } from 'redux-form';
import Store from 'store';
import { slugifier } from 'common/normalizers';
import DatePicker from 'schema-form/elements/date-picker';
import DateTimePicker from 'schema-form/elements/date-time-picker';

const defaultStartDate = Math.round(new Date().getTime() / 1000);
const defaultEndDate = defaultStartDate + 60 * 60 * 24 * 180; // 6 months
const getLabelFieldName = (values) => {
  const { type } = values;
  return t1(type === 'semester' ? 'semester_name' : 'school_year_name');
};
const getLabelFieldCode = (values) => {
  const { type } = values;
  return t1(type === 'semester' ? 'semester_code' : 'school_year_code');
};
const displaySchoolYear = (values) => {
  const { type } = values;
  return type === 'semester' ? 'inline-block' : 'none';
};
const getErrorTextRegister = (min, max, type = 'date') => {
  if (!min && !max) {
    return '';
  }
  const formatTimeString =
    type === 'date' ? timestampToDateString : timestampToDateTimeString;
  if (!min) {
    return t1('must_be_before_%s', formatTimeString(max));
  }
  if (!max) {
    return t1('must_be_after_%s', formatTimeString(min));
  }
  return t1('must_be_after_%s_and_before_%s', [
    formatTimeString(min),
    formatTimeString(max),
  ]);
};

const handleTypeChange = (formid, values, value) => {
  if (value === 'school_year') {
    [
      'school_year',
      'start_reg_time',
      'end_reg_time',
      'withdraw_deadline',
    ].forEach((key) => {
      if (key !== 'type') {
        Store.dispatch(change(formid, key, ''));
      }
    });
  }
};

const schema = (formid, values, step) => ({
  type: {
    type: 'radio',
    floatingLabelText: t1('type'),
    floatingLabelFixed: true,
    options: semesterTypes(),
    fullWidth: true,
    defaultValue: 'semester',
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
    onChange: (event, value) => handleTypeChange(formid, values, value),
  },
  name: {
    type: 'text',
    hintText: getLabelFieldName(values),
    floatingLabelText: getLabelFieldName(values),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1('name_cannot_be_empty'))],
  },
  code: {
    type: 'text',
    hintText: getLabelFieldCode(values),
    floatingLabelText: getLabelFieldCode(values),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
    validate: [required(t1('code_cannot_be_empty'))],
    readOnly: step !== 'new',
  },
  start_date: {
    type: DatePicker,
    hintText: t1('start_date'),
    floatingLabelText: t1('start_date'),
    getStartDate: true,
    container: 'inline',
    defaultValue: defaultStartDate,
    validate: [
      required(t1('cannot_be_empty')),
      inRange(
        null,
        values && values.end_date,
        getErrorTextRegister(null, values && values.end_date),
      ),
    ],
  },
  end_date: {
    type: DatePicker,
    getEndDate: true,
    hintText: t1('end_date'),
    floatingLabelText: t1('end_date'),
    container: 'inline',
    defaultValue: defaultEndDate,
    validate: [
      required(t1('cannot_be_empty')),
      inRange(
        (values && values.start_date) || dateToTimestamp(),
        null,
        getErrorTextRegister(
          (values && values.start_date) || dateToTimestamp(),
        ),
      ),
    ],
  },
  minimum_credits: {
    type: 'text',
    hintText: t1('minimum_credits'),
    floatingLabelText: t1('minimum_credits'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [isNumber(t1('minimum_credits_is_number'))],
  },
  school_year: {
    type: 'select',
    options: 'async',
    floatingLabelText: t1('school_year'),
    defaultValue: 0,
    errorText: '',
    paramsasync: {
      valueKey: 'iid',
    },
    style: { display: displaySchoolYear(values) },
    fullWidth: true,
  },
  start_reg_time: {
    type: DateTimePicker,
    validate: [
      required(t1('cannot_be_empty')),
      inRange(
        null,
        (values && values.end_reg_time) || (values && values.end_date),
        getErrorTextRegister(
          values && values.start_date,
          (values && values.end_reg_time) || (values && values.end_date),
          'time',
        ),
      ),
    ],
    floatingLabelText: t1('start_register_time'),
    fullWidth: true,
  },
  end_reg_time: {
    type: DateTimePicker,
    validate: [
      required(t1('cannot_be_empty')),
      inRange(
        values && values.start_reg_time,
        values && values.end_date,
        getErrorTextRegister(
          values && values.start_reg_time,
          values && values.end_date,
          'time',
        ),
      ),
    ],
    floatingLabelText: t1('end_register_time'),
    fullWidth: true,
  },
  withdraw_deadline: {
    type: DateTimePicker,
    validate: [
      inRange(
        values && values.start_reg_time,
        null,
        t1('withdraw_deadline_is_incorrect'),
      ),
    ],
    floatingLabelText: t1('withdraw_deadline'),
    fullWidth: true,
  },
});
let semesterFields = [
  'name',
  'code',
  'school_year',
  'start_date',
  'end_date',
  'minimum_credits',
];
const schoolYearFields = ['name', 'start_date', 'end_date', 'minimum_credits'];
const ui = (step, values) => {
  let fields = step === 'new' ? ['type'] : [];
  if (values.type && values.type === 'school_year') {
    fields = fields.concat(schoolYearFields);
  } else {
    if (values && values.end_date > Math.floor(Date.now() / 1000)) {
      semesterFields = semesterFields.concat([
        'start_reg_time',
        'end_reg_time',
        'withdraw_deadline',
      ]);
    }

    fields = fields.concat(semesterFields);
  }
  return [
    {
      id: 'default',
      fields,
    },
  ];
};
const layout = {
  new: '',
};
export default { schema, ui, layout };
