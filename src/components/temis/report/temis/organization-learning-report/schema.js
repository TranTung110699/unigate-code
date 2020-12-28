import { t1 } from 'translate';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { required } from 'common/validators';
import LayoutFreeStyle from './LayoutFreestyle';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  organizations: organizations({
    formid,
    multiple: false,
    label: `${t1('organizations')}`,
    defaultValue: props.orgIids,
    validate: required(t1('organization_can_not_empty')),
  }),
  include_sub_organizations: includeSubOrganizations(domainInfo.conf),
});

const ui = () => [
  {
    id: 'default',
    fields: ['organizations', 'include_sub_organizations'],
  },
];

export default {
  schema,
  ui,
  layout: {
    component: LayoutFreeStyle,
    freestyle: 1,
  },
};
