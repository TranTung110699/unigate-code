import { t1 } from 'translate';
import {
  text,
  fullTextOp,
} from 'components/admin/group/schema/elements/filterset/filter/query/text';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  VTRICDANH_TDUONG_ID: text(t1('equivalent_position_id')),
  equivalent_position_id_operator: fullTextOp(),
  VTRICDANH_TDUONG_CODE: text(t1('equivalent_position_code')),
  equivalent_position_code_operator: fullTextOp(),
  VTRICDANH_TDUONG: text(t1('equivalent_position_name')),
  equivalent_position_name_operator: fullTextOp(),
  org_id: text(t1('org_id')),
  org_id_operator: fullTextOp(),
  CDANHTDUONG_EVN_ID: text(t1('top_equivalent_position_id')),
  top_equivalent_position_id_operator: fullTextOp(),
});

const getFormFilterFields = (step, values) => [
  'VTRICDANH_TDUONG_ID',
  'equivalent_position_id_operator',
  'VTRICDANH_TDUONG_CODE',
  'equivalent_position_code_operator',
  'VTRICDANH_TDUONG',
  'equivalent_position_name_operator',
  'org_id',
  'org_id_operator',
  'CDANHTDUONG_EVN_ID',
  'top_equivalent_position_id_operator',
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
