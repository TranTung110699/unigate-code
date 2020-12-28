import { t1 } from 'translate';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import SearchFormLayout from './SearchFormLayout';

const schema = () => ({
  form_of_training: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: [
        'faculty',
        'major',
        'training_mode',
        'training_level',
        'school_year',
        'semester',
        'ico',
      ],
      notValidate: true,
      forSearch: true,
      multiple: true,
    }),
  },
  credit_syllabus: {
    type: 'text',
    floatingLabelText: t1('subject_info'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  student: {
    type: 'text',
    floatingLabelText: t1('student_info'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'id',
    fields: ['form_of_training', 'credit_syllabus', 'student'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
