import { t1 } from 'translate';
import {
  text,
  fullTextOp,
} from 'components/admin/group/schema/elements/filterset/filter/query/text';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  VTRI_ID: text(t1('position_id')),
  position_id_operator: fullTextOp(),
  TEN_VTRICDANH: text(t1('position_name')),
  position_name_operator: fullTextOp(),
  org_id: text(t1('org_id')),
  org_id_operator: fullTextOp(),
  VTRICDANH_TDUONG_ID: text(t1('equivalent_position_id')),
  equivalent_position_id_operator: fullTextOp(),
  hrms_status: text(t1('hrms_status')),
  hrms_status_operator: fullTextOp(),
});

const getFormFilterFields = (step, values) => [
  'VTRI_ID',
  'position_id_operator',
  'TEN_VTRICDANH',
  'position_name_operator',
  'org_id',
  'org_id_operator',
  'VTRICDANH_TDUONG_ID',
  'equivalent_position_id_operator',
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
