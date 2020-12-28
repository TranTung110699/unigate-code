import { t1 } from 'translate';
import SearchFormFreestyle from '../layout/SearchFormFreestyle';

const schema = () => ({
  username: {
    type: 'text',
    hintText: t1('enter_username'),
    floatingLabelText: t1('username'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
});

const ui = () => {
  const fields = ['username'];

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
  layout: {
    component: SearchFormFreestyle,
    freestyle: 1,
  },
};
