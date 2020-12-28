import { t1 } from 'translate';
import { required } from 'common/validators';

const schema = (formid, values, step) => ({
  name: {
    type: 'text',
    hintText: t1('location_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1('name_cannot_be_empty'))],
  },
  time: {
    type: 'text',
    floatingLabelText: t1('pickup_time'),
    // hiddenAddButton: true,
    // hiddenRemoveButton: true,
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'loc',
      fields: ['name', 'time'],
    },
  ];
};

export default { schema, ui };
