import { t1 } from 'translate';
import LayoutFreestyle from './LayoutFreestyle';

const schema = () => {
  return {
    attended_number_student: {
      type: 'number',
      hintText: t1('enter_number_student'),
      floatingLabelText: t1('number_student'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
  };
};

const ui = () => [
  {
    id: 'id', // you still have to have this id even for freestyle
    fields: ['attended_number_student'],
  },
];

export default {
  schema,
  ui,
  layout: {
    component: LayoutFreestyle,
    freestyle: 1,
    isSIS: true,
  },
};
