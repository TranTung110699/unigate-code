import { t1 } from 'translate';
import { constants } from 'configs/constants';
import getFormSchemaConfigs from 'api-endpoints/form-schema-configs';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = () => ({
  code: {
    type: 'text',
    floatingLabelText: t1('code'),
    floatingLabelFixed: false,
    fullWidth: true,
  },
  title: {
    type: 'text',
    floatingLabelText: t1('title'),
    floatingLabelFixed: false,
    fullWidth: true,
  },
  tpl_action: {
    type: 'select',
    floatingLabelText: t1('action'),
    options: 'async',
    paramsasync: {
      __url__: getFormSchemaConfigs('message_template_actions'),
    },
    fullWidth: true,
  },
  language: {
    type: 'multiCheckbox',
    floatingLabelText: t1('languages'),
    options: 'async',
    paramsasync: {
      __url__: getFormSchemaConfigs('usable_languages'),
    },
    fullWidth: true,
  },
  method: {
    type: 'multiCheckbox',
    floatingLabelText: t1('methods'),
    options: constants.communicationMethodsOptions(),
    fullWidth: true,
  },
  status: {
    type: 'multiCheckbox',
    floatingLabelText: t1('statuses'),
    options: constants.messageTemplateStatusOptions(),
    inline: true,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['code', 'title', 'tpl_action', 'language', 'method', 'status'],
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
