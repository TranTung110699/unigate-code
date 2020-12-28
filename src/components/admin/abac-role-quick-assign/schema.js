import { t1 } from 'translate';
import schemaItems from './schema-items';

const schema = (formid, values, step) => {
  return {
    quickAssignRole: {
      type: 'array',
      schema: schemaItems,
      floatingLabelText: t1('quick_assign_role'),
    },
  };
};

const ui = () => {
  const fields = ['quickAssignRole'];

  return [
    {
      id: 'default',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
};
