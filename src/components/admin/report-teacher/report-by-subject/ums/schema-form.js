import { t1 } from 'translate';
import SearchFormLayout from './SearchFormLayout';
import getMajorBoxSchema from '../../../user/schema/form-of-training/schema';
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
});

const ui = () => [
  {
    id: 'default',
    fields: ['major', 'semester', 'subject_iids'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
