import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import Layout from './schema-layout';
import Toggle from 'schema-form/elements/toggle';

const schema = (formid, values, step, xpath) => ({
  display: {
    type: Toggle,
    dataSet: {
      off: 0,
      on: 1,
    },
    label: lodashGet(values, `${xpath}.name`),
    offLabel: t1('hide'),
    onLabel: t1('show'),
    labelPosition: 'right',
    styleWrapper: { padding: 0 },
  },
});

const ui = () => [
  {
    id: 'id',
    fields: ['display'],
  },
];

const layout = () => ({ component: Layout, freestyle: 1 });

export default { schema, ui, layout };
