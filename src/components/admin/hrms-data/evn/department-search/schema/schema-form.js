import { t1 } from 'translate';
import {
  text,
  fullTextOp,
} from 'components/admin/group/schema/elements/filterset/filter/query/text';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  text: text(t1('name/_short_name')),
  text_operator: fullTextOp(),
  DEPARTMENT_ID: text(t1('department_id')),
  department_id_operator: fullTextOp(),
  ORGANIZATION_ID: text(t1('org_id')),
  org_id_operator: fullTextOp(),
  DEPT_LEVEL: text(t1('dept_level')),
  dept_level_operator: fullTextOp(),
  DEPT_PARENT_ID: text(t1('dept_parent_id')),
  dept_parent_id_operator: fullTextOp(),
  isdeleted: text(t1('is_deleted')),
  isdeleted_operator: fullTextOp(),
  TTRANG_HDONG: text(t1('active_status')),
  active_status_operator: fullTextOp(),
  hrms_status: text(t1('hrms_status')),
  hrms_status_operator: fullTextOp(),
});

const getFormFilterFields = (step, values) => [
  'text',
  'text_operator',
  'ORGANIZATION_ID',
  'org_id_operator',
  'DEPARTMENT_ID',
  'department_id_operator',
  'DEPT_LEVEL',
  'dept_level_operator',
  'DEPT_PARENT_ID',
  'dept_parent_id_operator',
  'isdeleted',
  'isdeleted_operator',
  'TTRANG_HDONG',
  'active_status_operator',
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
