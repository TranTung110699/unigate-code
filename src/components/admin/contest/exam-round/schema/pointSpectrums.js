import { required } from 'common/validators';
import { t1 } from 'translate';

const schema = (formid, values) => ({
  name: {
    type: 'text',
    hintText: t1('typing_name_of_point_spectrum'),
    floatingLabelText: `${t1('point_spectrum_name')} (*)`,
    validate: [required(t1('name_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  value: {
    type: 'text',
    hintText: t1('typing_value_of_point_spectrum'),
    floatingLabelText: `${t1('point_spectrum_value')} (*)`,
    validate: [required(t1('value_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'default',
      fields: ['name', 'value'],
    },
  ];
};

export default { schema, ui };
