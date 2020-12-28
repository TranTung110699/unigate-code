import { t1 } from 'translate';
import get from 'lodash.get';
import ModulePermissionSchemaLayout from './modulePermissionSchemaLayout';
import Toggle from 'schema-form/elements/toggle';

const schema = (formid, values, step, xpath) => {
  const accessible = get(values, `${xpath}.accessible`);
  let permissionModuleId = '';
  if (xpath) {
    const parts = xpath.split('.');
    permissionModuleId = parts[parts.length - 1];
  }

  const appliedScope = values.applied_scope;
  const type = values.type || '';

  const freezeActions = type !== 'abstract' ? !!values.freeze_actions : false;

  return {
    accessible: {
      type: Toggle,
      label: t1('accessible'),
      labelPosition: 'right',
      disabled: freezeActions,
    },
    allowed_actions: {
      type: 'multiCheckbox',
      hiddenWhenOptionEmpty: true,
      options: 'async',
      paramsasync: {
        key: `allowed-actions-in-module-${permissionModuleId}-${appliedScope}`,
        value: {
          module_id: permissionModuleId,
          applied_scope: appliedScope,
        },
      },
      disabled: freezeActions,
      floatingLabelText: t1('allowed_actions'),
    },
  };
};

const ui = (step, values, themeConfig, xpath) => {
  const accessible = get(values, `${xpath}.accessible`);
  return [
    {
      id: 'default',
      fields: ['accessible', ...(accessible ? ['allowed_actions'] : [])],
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: ModulePermissionSchemaLayout, freestyle: 1 },
};
