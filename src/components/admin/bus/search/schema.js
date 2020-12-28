import { t1 } from 'translate';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = () => ({
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
  },
});

const ui = () => [
  {
    id: 'id',
    fields: ['name'],
  },
];

export default {
  schema,
  ui,
  layout: {
    component: SearchFormLayoutFreestyle,
    freestyle: 1,
  },
};
