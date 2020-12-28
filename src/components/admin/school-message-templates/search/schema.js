import { t1 } from 'translate';
import { constants } from 'configs/constants';
import { required } from 'common/validators';
import getFormSchemaConfigs from 'api-endpoints/form-schema-configs';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = () => ({
  tpl_action: {
    type: 'select',
    floatingLabelText: t1('action'),
    options: 'async',
    paramsasync: {
      __url__: getFormSchemaConfigs('message_template_actions'),
    },
    fullWidth: true,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
  },
  languages: {
    type: 'multiCheckbox',
    floatingLabelText: t1('languages'),
    options: 'async',
    paramsasync: {
      __url__: getFormSchemaConfigs('usable_languages'),
    },
    fullWidth: true,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
  },
  methods: {
    type: 'multiCheckbox',
    floatingLabelText: t1('methods'),
    options: constants.communicationMethodsOptions(),
    fullWidth: true,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['tpl_action', 'languages', 'methods'],
  },
];

export default {
  schema,
  ui,
  layout: {
    component: SearchFormLayoutFreestyle,
    freestyle: 1,
  },
};
