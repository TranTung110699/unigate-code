import { t1 } from 'translate';

const schema = () => {
  return {
    name: {
      type: 'text',
      floatingLabelText: t1('search_by_name_or_iid'),
      label: t1('search_by_name_or_iid'),
      hintText: t1('please_type_search_text'),
    },
  };
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['name'],
    },
  ];
};

export default { schema, ui };
