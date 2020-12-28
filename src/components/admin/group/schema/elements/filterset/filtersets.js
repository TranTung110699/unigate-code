import filterset from './filterset';
import { t1 } from 'translate';

export const filtersets = {
  type: 'array',
  schema: filterset,
};

const schema = (formid, values) => {
  return {
    filtersets,
  };
};

const ui = (step, values) => [
  {
    title: t1('filterset'),
    id: 'id',
    fields: ['filtersets'],
  },
];

export default { schema, ui };
