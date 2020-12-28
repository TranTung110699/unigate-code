import { t1 } from 'translate';

const schema = () => ({
  text: {
    type: 'text',
    floatingLabelText: t1('search_staff'),
    label: t1('search_staff'),
    hintText: t1('please_enter_search_text'),
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'id',
    fields: ['text'],
  },
];

export default { ui, schema };
