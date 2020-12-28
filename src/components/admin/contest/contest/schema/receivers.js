import { isEmail, required } from 'common/validators';
import { t1 } from 'translate';

const schema = (formid, values) => ({
  name: {
    type: 'text',
    hintText: t1('typing_name_of_receiver'),
    floatingLabelText: `${t1('receiver_name')} (*)`,
    validate: [required(t1('name_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  mail: {
    type: 'text',
    hintText: t1('typing_email_of_receiver'),
    floatingLabelText: `${t1('receiver_email')} (*)`,
    validate: [
      required(t1('email_cannot_be_empty')),
      isEmail(t1('this_is_not_a_valid_email')),
    ],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'default',
      fields: ['name', 'mail'],
    },
  ];
};

export default { schema, ui };
