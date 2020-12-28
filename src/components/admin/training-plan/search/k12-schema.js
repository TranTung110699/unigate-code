import { t1 } from 'translate';
import { year } from 'configs/constants';
import SearchFormLayoutFreestyle from './K12SearchFormLayoutFreestyle';

const schema = (formid) => ({
  text: {
    type: 'text',
    floatingLabelText: t1('name'),
    floatingLabelFixed: true,
    errorText: '',
    fullWidth: true,
  },
  // year: {
  //   type: 'select',
  //   floatingLabelText: t1('year'),
  //   floatingLabelFixed: true,
  //   options: year(true),
  //   fullWidth: true,
  //   defaultValue: new Date().getFullYear(),
  // },
});

const ui = () => [
  {
    id: 'default',
    fields: ['text', 'year'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
