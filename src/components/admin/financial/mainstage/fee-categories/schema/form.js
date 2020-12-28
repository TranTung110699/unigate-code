import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';

import { t1 } from 'translate';

const schema = {
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
  },
  sub_type: {
    type: 'checkbox',
    name: 'sub_type',
    label: t1('use_for_deposit_to_account_only'),
    defaultValue: false,
  },
  is_mandatory: {
    type: 'checkbox',
    name: 'is_mandatory',
    label: t1('is_mandatory_fee'),
    defaultValue: false,
  },
};

const ui = (step) => {
  const config = {
    new_fee: [
      {
        id: 'default',
        fields: [
          'name',
          'code',
          'sub_type',
          // 'is_mandatory'
        ],
      },
    ],
    edit_fee: [
      {
        id: 'default',
        fields: [
          'name',
          'code',
          'sub_type',
          // 'is_mandatory'
        ],
      },
    ],
  };
  return config[step];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
