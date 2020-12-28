import { t1 } from 'translate';

const schema = () => ({
  value: {
    type: 'text',
    hintText: t1('value'),
    floatingLabelText: t1('value_(*)'),
    defaultValue: '',
    fullWidth: true,
    required: true,
  },
  name: {
    type: 'text',
    hintText: t1('name'),
    floatingLabelText: t1('name_(*)'),
    defaultValue: '',
    fullWidth: true,
    required: true,
  },
  before: {
    type: 'text',
    hintText: t1('before_(minute)'),
    floatingLabelText: t1('before_(minute)_(*)'),
    defaultValue: '',
    fullWidth: true,
    required: true,
  },
});

const ui = () => [
  {
    id: 'course_deadline_reminder_settings',
    fields: ['value', 'name', 'before'],
  },
];

export default { schema, ui };
