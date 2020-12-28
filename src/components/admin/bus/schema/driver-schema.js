import { t1 } from 'translate';
import { required } from 'common/validators';

const schema = (formid, values, step) => ({
  name: {
    type: 'text',
    hintText: t1('driver_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1('name_cannot_be_empty'))],
  },
  phone: {
    type: 'text',
    floatingLabelText: t1('phone_number'),
    // hiddenAddButton: true,
    // hiddenRemoveButton: true,
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'driver',
      fields: ['name', 'phone'],
    },
  ];
};

export default { schema, ui };
