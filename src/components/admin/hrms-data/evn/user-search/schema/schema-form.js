import { t1 } from 'translate';
import {
  text,
  fullTextOp,
} from 'components/admin/group/schema/elements/filterset/filter/query/text';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  full_name: text(t1('full_name')),
  full_name_operator: fullTextOp(),
  login_name: text(t1('login_name')),
  login_name_operator: fullTextOp(),
  phone: text(t1('phone')),
  phone_operator: fullTextOp(),
  mail: text(t1('mail')),
  mail_operator: fullTextOp(),
  ns_id: text(t1('ns_id')),
  ns_id_operator: fullTextOp(),
  ns_number: text(t1('ns_number')),
  ns_number_operator: fullTextOp(),
  org_id: text(t1('org_id')),
  org_id_operator: fullTextOp(),
  org_name: text(t1('org_name')),
  org_name_operator: fullTextOp(),
  dept_id: text(t1('dept_id')),
  dept_id_operator: fullTextOp(),
  dept_name: text(t1('dept_name')),
  dept_name_operator: fullTextOp(),
  vtri_id: text(t1('vtri_id')),
  vtri_id_operator: fullTextOp(),
  position_name: text(t1('position_name')),
  position_name_operator: fullTextOp(),
  user_ad: text(t1('user_ad')),
  user_ad_operator: fullTextOp(),
  user_enable: text(t1('user_enable')),
  user_enable_operator: fullTextOp(),
  hrms_status: text(t1('hrms_status')),
  hrms_status_operator: fullTextOp(),
});

const getFormFilterFields = (step, values) => [
  'full_name',
  'full_name_operator',
  'login_name',
  'login_name_operator',
  'phone',
  'phone_operator',
  'mail',
  'mail_operator',
  'ns_id',
  'ns_id_operator',
  'ns_number',
  'ns_number_operator',
  'org_id',
  'org_id_operator',
  'org_name',
  'org_name_operator',
  'dept_id',
  'dept_id_operator',
  'dept_name',
  'dept_name_operator',
  'vtri_id',
  'vtri_id_operator',
  'position_name',
  'position_name_operator',
  'user_ad',
  'user_ad_operator',
  'user_enable',
  'user_enable_operator',
  'hrms_status',
  'hrms_status_operator',
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
