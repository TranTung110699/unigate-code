import { t1 } from 'translate';
import { required } from 'common/validators';
import FeeLayoutFreestyle from './layout-learning-item-freestyle';

const schema = () => ({
  name: {
    type: 'text',
  },
  iid: {
    type: 'number',
    validate: [required(t1('iid_cannot_be_empty'))],
  },
  code: {
    type: 'text',
  },
  ntype: {
    type: 'text',
    validate: [required(t1('ntype_cannot_be_empty'))],
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['iid', 'name', 'ntype', 'id', 'code'],
  },
];

const layout = { component: FeeLayoutFreestyle, freestyle: 1 };

export default { schema, ui, layout };
