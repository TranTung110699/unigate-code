import { t1 } from 'translate';
import { contests } from 'components/admin/contest/contest/schema/elements';
import { required, validationWithCondition } from 'common/validators';
import SearchFormLayout from './SearchFormLayout';
import { includeSubOrganizations } from 'components/admin/organization/schema/elements';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  contest_iids: contests(formid, {
    floatingLabelText: `${t1('contests')}`,
    fullWidth: true,
    validate: [validationWithCondition(required())],
  }),
  include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
    defaultValue: 1,
  }),
});

const ui = () => [
  {
    id: 'default',
    fields: ['contest_iids', 'include_sub_organizations'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
