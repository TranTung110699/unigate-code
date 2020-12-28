/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('search_by_exam_round_name'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  code: {
    type: 'text',
    floatingLabelText: t1('search_by_exam_round_code'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
});

const ui = (step, values) => {
  const fields = ['name', 'code'];

  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
