import { t1 } from 'translate';
import SearchFormLayout from './SearchFormLayout';
import getMajorBoxSchema from '../../user/schema/form-of-training/schema';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid, values) => ({
  major: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: [
        'faculty',
        'major',
        'training_mode',
        'training_level',
        'ico',
      ],
      notValidate: true,
      forSearch: true,
    }),
    fullWidth: true,
  },
  subject_iids: {
    nameElement: 'syllabus',
    type: InputAutoComplete,
    baseUrl: '/site/api/get-data-schema?ntype=syllabus&type=credit',
    floatingLabelText: t1('subject_name'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'primaryText',
      value: 'value',
    },
  },
  course_iids: {
    nameElement: 'course',
    type: InputAutoComplete,
    baseUrl: `/site/api/get-data-schema?ntype=course&type=course`,
    floatingLabelText: t1('course_name'),
    fullWidth: true,
    params: {
      credit_syllabus: values && values.subject_iids,
    },
    dataSourceConfig: {
      text: 'primaryText',
      value: 'value',
    },
  },
  user_name: {
    type: 'text',
    hintText: t1('student_name'),
    floatingLabelText: t1('student_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  min_number_of_absences: {
    type: 'number',
    hintText: t1('min_number_of_absences'),
    floatingLabelText: t1('min_number_of_absences'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      'major',
      'user_name',
      'subject_iids',
      'course_iids',
      'min_number_of_absences',
    ],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
