import { t1 } from 'translate';
import {
  text,
  fullTextOp,
} from 'components/admin/group/schema/elements/filterset/filter/query/text';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  CDANHTDUONG_EVN_ID: text(t1('top_equivalent_position_id')),
  top_equivalent_position_id_operator: fullTextOp(),
  CDANHTDUONG_EVN_CODE: text(t1('top_equivalent_position_code')),
  top_equivalent_position_code_operator: fullTextOp(),
  CDANHTDUONG_EVN: text(t1('top_equivalent_position_name')),
  top_equivalent_position_name_operator: fullTextOp(),
});

const getFormFilterFields = (step, values) => [
  'CDANHTDUONG_EVN_ID',
  'top_equivalent_position_id_operator',
  'CDANHTDUONG_EVN_CODE',
  'top_equivalent_position_code_operator',
  'CDANHTDUONG_EVN',
  'top_equivalent_position_name_operator',
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
