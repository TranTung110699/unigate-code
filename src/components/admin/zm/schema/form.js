import { required } from 'common/validators';
import { t1 } from 'translate';

const schema = (formid, values) => {
  return {
    name: {
      type: 'text',
      hintText: t1('name_of_zm'),
      floatingLabelText: t1('name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
  };
};

const ui = (step, values) => {
  const config = {
    new: [
      {
        id: 'default',
        fields: ['name'],
      },
    ],
    edit: [
      {
        id: 'default',
        fields: ['name'],
      },
    ],
  };
  return config[step];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
