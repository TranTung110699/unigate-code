import { required } from 'common/validators';
import { constants } from 'configs/constants';
import { t1 } from 'translate';

const schema = (formid) => ({
  name: {
    type: 'text',
    hintText: t1('name'),
    floatingLabelText: t1('template_name'),
    fullWidth: true,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
  },
  template_title: {
    type: 'text',
    hintText: t1('title'),
    floatingLabelText: t1('template_title'),
    fullWidth: true,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
  },
  content: {
    type: 'text',
    hintText: t1('content'),
    floatingLabelText: t1('template_content'),
    defaultValue: '',
    fullWidth: true,
    multiLine: true,
    rows: 2,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
  },
  available_methods: {
    type: 'multiCheckbox',
    floatingLabelText: t1('available_methods'),
    options: constants.communicationMethodsOptions(),
    vertical: true,
    floatingLabelFixed: true,
    fullWidth: true,
  },
});

const ui = {
  new: [
    {
      id: 'default',
      fields: ['name', 'template_title', 'content', 'available_methods'],
    },
  ],
  edit_template: [
    {
      id: 'default',
      fields: ['name', 'template_title', 'content', 'available_methods'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
