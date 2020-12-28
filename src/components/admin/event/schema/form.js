import { inRange, required } from 'common/validators';
import { eventTypeOptions, eventTypes } from 'configs/constants';
import { t1 } from 'translate';
import { convertBooleanValueToInt } from 'common/normalizers';
import locationSchema from './location-schema';
import DurationThatBiggerThanOneDay from 'schema-form/elements/duration/BiggerThanOneDay';
import RecurringRule from 'schema-form/elements/recurring-rule';
import DateTimePicker from 'schema-form/elements/date-time-picker';
import RTE from 'schema-form/elements/richtext';

const schema = (formid, values) => ({
  type: {
    type: 'select',
    hintText: t1('type'),
    floatingLabelText: t1('type'),
    defaultValue: eventTypes.ONCE,
    fullWidth: true,
    options: eventTypeOptions,
    validate: [required()],
  },
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  effect_to_timetable: {
    type: 'checkbox',
    label: t1('effect_to_timetable'),
    fullWidth: true,
    defaultValue: 1,
    normalize: convertBooleanValueToInt,
  },
  start_date: {
    type: DateTimePicker,
    floatingLabelText: t1('event_from'),
    fullWidth: true,
    getStartDate: true,
    maxDate: values.end_date,
    validate: [required()],
  },
  end_date: {
    type: DateTimePicker,
    floatingLabelText: t1('event_to'),
    fullWidth: true,
    getEndDate: true,
    minDate: values.start_date,
  },
  duration: {
    type: DurationThatBiggerThanOneDay,
    floatingLabelText: `${t1('duration')}`,
    fieldsToShow: ['days', 'hours', 'minutes'],
    fullWidth: true,
    validate: [inRange(1, undefined, t1('duration_is_required'))],
  },
  detail: {
    type: RTE,
    hintText: t1('enter_detail'),
    floatingLabelText: t1('detail'),
    errorText: '',
    multiLine: true,
    fullWidth: true,
  },
  location: {
    type: 'section',
    schema: locationSchema,
  },
  recurring_rule: {
    type: RecurringRule,
    startDateUnixTimestamp: values.start_date,
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'default',
      fields: [
        'name',
        'effect_to_timetable',
        'type',
        'start_date',
        ...(values.type === eventTypes.ONCE ? ['end_date'] : []),
      ],
    },
    ...(values.type === eventTypes.RECURRING
      ? [
          {
            id: 'recurring_info',
            title: t1('recurring_info'),
            fields: ['recurring_rule', 'duration', 'end_date'],
          },
        ]
      : []),
    {
      id: 'others',
      fields: ['location', 'detail'],
    },
  ];
};

const validate = (values) => {
  let errors = undefined;

  if (values.type === eventTypes.ONCE) {
    if (!values.end_date) {
      errors = Object.assign({}, errors, {
        end_date: t1('this_field_is_required'),
      });
    }
  }

  if (values.type === eventTypes.RECURRING) {
    if (!values.recurring_rule) {
      errors = Object.assign({}, errors, {
        recurring_rule: t1('information_about_recurring_event_cannot_be_empty'),
      });
    }
  }

  return errors;
};

export default { schema, ui, validate };
