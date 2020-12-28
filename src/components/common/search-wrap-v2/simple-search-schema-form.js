import { t1 } from 'translate';

const page = {
  type: 'hidden',
};
const items_per_page = {
  type: 'hidden',
};

const schema = (formid, values) => ({
  q: {
    type: 'text',
    floatingLabelText: t1('name'),
    defaultValue: '',
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  page,
  items_per_page,
});

const ui = (step, values) => {
  return [
    {
      id: 'id',
      fields: ['q', 'page', 'items_per_page'],
    },
  ];
};

export default { schema, ui };
