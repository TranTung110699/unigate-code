import { required } from 'common/validators';
import { t1 } from 'translate';

const schema = () => ({
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    disabled: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  value: {
    type: 'text',
    rowsMax: 10,
    rows: 4,
    multiLine: true,
    floatingLabelText: t1('value'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  type: {
    type: 'text',
    floatingLabelText: t1('type'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    disabled: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
});

const ui = {
  edit: [
    {
      id: 'default',
      title: t1('edit_redis'),
      fields: ['name', 'value', 'type'],
    },
  ],
};

const layout = {
  edit: '',
};

export default { schema, ui, layout };
