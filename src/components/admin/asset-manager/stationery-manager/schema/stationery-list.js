import { required } from 'common/validators';
import { t1 } from 'translate';

const schema = (formid, values) => ({
  code: {
    type: 'text',
    hintText: t1('enter_code'),
    floatingLabelText: `${t1('code')} (*)`,
    validate: [required(t1('code_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    classWrapper: 'col-md-6',
    disabled: true,
  },
  quantity: {
    type: 'number',
    hintText: t1('quantity'),
    floatingLabelText: `${t1('quantity')} (*)`,
    defaultValue: 0,
    errorText: '',
    classWrapper: 'col-md-6',
    validate: required(t1('quantity_is_required')),
  },
});

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['code', 'quantity'],
    },
  ];
};

export default {
  schema,
  ui,
  layout: {},
};
