import { t1 } from 'translate';
import SearchFormLayout from './SearchFormLayout';
import getMajorBoxSchema from '../../user/schema/form-of-training/schema';

const schema = () => ({
  major: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: [
        'faculty',
        'major',
        'training_mode',
        'training_level',
        'ico',
        'status',
      ],
      notValidate: true,
      forSearch: true,
    }),
    fullWidth: true,
  },
  name: {
    type: 'text',
    hintText: t1('student_name'),
    floatingLabelText: t1('student_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['major', 'name'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
