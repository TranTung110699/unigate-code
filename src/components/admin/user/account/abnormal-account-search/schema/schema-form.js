import { t1 } from 'translate';
import {
  fullTextOp,
  text,
} from 'components/admin/group/schema/elements/filterset/filter/query/text';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import { includeSubOrganizations } from 'components/admin/organization/schema/elements';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  code: text(t1('account_code')),
  code_operator: fullTextOp(),
  name: text(t1('account_name')),
  name_operator: fullTextOp(),
  mail: text(t1('account_mail')),
  mail_operator: fullTextOp(),
  organization: text(t1('account_organization')),
  organization_operator: fullTextOp(),
  phongban: text(t1('account_phong_ban')),
  phongban_operator: fullTextOp(),
  job_position: text(t1('account_job_position')),
  job_position_operator: fullTextOp(),
  equivalent_position: text(t1('account_equivalent_position')),
  equivalent_position_operator: fullTextOp(),
  top_equivalent_position: text(t1('account_top_equivalent_position')),
  top_equivalent_position_operator: fullTextOp(),
  include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
    defaultValue: 1,
  }),
});

const getFormFilterFields = (step, values) => [
  'code',
  'code_operator',
  'name',
  'name_operator',
  'mail',
  'mail_operator',
  'organization',
  'organization_operator',
  'phongban',
  'phongban_operator',
  'job_position',
  'job_position_operator',
  'equivalent_position',
  'equivalent_position_operator',
  'top_equivalent_position',
  'top_equivalent_position_operator',
  'include_sub_organizations',
];

const ui = (step, values) => [
  {
    id: 'id',
    fields: getFormFilterFields(step, values),
  },
];

export default () => ({
  schema,
  ui,
  layout: {
    component: SearchFormLayoutFreestyle,
    freestyle: 1,
  },
});
