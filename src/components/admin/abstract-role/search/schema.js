import { abacRoleAppliedScopeOptions } from 'configs/constants';
import { t1 } from 'translate';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('abstract_role_name'),
  },
  applied_scope: {
    type: 'multiCheckbox',
    floatingLabelText: t1('applied_scope'),
    options: abacRoleAppliedScopeOptions(),
    inline: true,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['name', 'applied_scope'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
