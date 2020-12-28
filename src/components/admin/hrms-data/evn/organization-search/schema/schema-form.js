import { t1 } from 'translate';
import {
  text,
  fullTextOp,
} from 'components/admin/group/schema/elements/filterset/filter/query/text';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  text: text(t1('code/_name')),
  text_operator: fullTextOp(),
  org_id: text(t1('org_id')),
  org_id_operator: fullTextOp(),
  parent_code: text(t1('parent_code')),
  parent_code_operator: fullTextOp(),
  is_tct: text(t1('is_tct')),
  is_tct_operator: fullTextOp(),
  is_active: text(t1('is_active')),
  is_active_operator: fullTextOp(),
  hrms_status: text(t1('hrms_status')),
  hrms_status_operator: fullTextOp(),
});

const getFormFilterFields = (step, values) => [
  'text',
  'text_operator',
  'org_id',
  'org_id_operator',
  'parent_code',
  'parent_code_operator',
  'is_tct',
  'is_tct_operator',
  'is_active',
  'is_active_operator',
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
