import { t1 } from 'translate';

const schema = () => {
  return {
    q: {
      type: 'text',
      floatingLabelText: t1(
        'name_(will_search_name,meaning,content,allowedValues)',
      ),
      // defaultValue: 'name',
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
    },
    only_search_name_and_meaning: {
      type: 'checkbox',
      label: t1('only_search_name_and_meaning'),
    },
  };
};

const ui = () => {
  const fields = ['q', 'only_search_name_and_meaning'];

  return [
    {
      id: 'id',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
};
