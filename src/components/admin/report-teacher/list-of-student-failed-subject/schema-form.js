import { t1 } from 'translate';
import SearchFormLayout from './SearchFormLayout';
import getMajorBoxSchema from '../../user/schema/form-of-training/schema';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

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
      ],
      notValidate: true,
      forSearch: true,
    }),
    fullWidth: true,
  },
  semester: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: ['school_year', 'semester'],
      notValidate: true,
      forSearch: true,
      wrapperClass: 'cleanPadding',
    }),
    fullWidth: true,
  },
  allow_retaking: {
    type: 'checkbox',
    label: t1('allow_retaking_the_exam'),
  },
  syllabus: {
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
    fields: ['major', 'semester', 'allow_retaking', 'syllabus', 'name'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
