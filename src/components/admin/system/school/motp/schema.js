import { t1 } from 'translate';
import { constants } from 'configs/constants';

const schema = () => ({
  pass: {
    type: 'text',
    floatingLabelText: t1('motp_password'),
  },
  nr_of_logins: {
    type: 'number',
    floatingLabelText: t1('number_of_logins'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
    defaultValue: 1,
  },
  expire: {
    type: 'number',
    floatingLabelText: t1('expire_in_seconds'),
    // defaultValue: 'name',
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
    defaultValue: 600,
  },
  password_complexity: {
    type: 'radio',
    floatingLabelText: t1('auto_generated_password_complexity'),
    floatingLabelFixed: true,
    fullWidth: true,
    inline: true,
    options: [
      {
        value: 'simple',
        label: t1('simple'),
      },
      {
        value: 'complex',
        label: t1('complex'),
      },
    ],
  },
});

const ui = () => [
  {
    id: 'id', // you still have to have this id even for freestyle
    fields: ['nr_of_logins', 'expire', 'pass', 'password_complexity'],
  },
];

export default { schema, ui };
