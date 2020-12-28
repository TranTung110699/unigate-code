import { t1 } from 'translate';
import { text } from 'components/admin/group/schema/elements/filterset/filter/query/text';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  sql: text(t1('enter_sql_command_to_execute')),
});

const getFormFilterFields = (step, values) => ['sql'];

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
