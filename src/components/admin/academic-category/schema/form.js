import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import { t1 } from 'translate';

const schema = (formid, values, step) => ({
  name: {
    type: 'text',
    hintText: t1('name'),
    floatingLabelText: t1('name'),
    validate: [required(t1('name_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  code: {
    type: 'text',
    hintText: t1('code'),
    floatingLabelText: t1('code'),
    validate: [required(t1('code_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
    disabled: step === 'edit_academic',
  },
  slug: {
    type: 'text',
    hintText: t1('slug'),
    floatingLabelText: t1('slug'),
    validate: [required(t1('slug_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
  },
});

const ui = (step) => {
  const config = {
    new_academic: [
      {
        id: 'default',
        fields: ['name', 'code'],
      },
    ],
    edit_academic: [
      {
        id: 'default',
        fields: ['name', 'code'],
      },
    ],
  };

  return config[step];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
