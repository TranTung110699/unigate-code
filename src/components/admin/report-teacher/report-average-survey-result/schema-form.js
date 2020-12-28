import { t1 } from 'translate';
import { required } from 'common/validators';
import { year, courseLearningTypes } from 'configs/constants';
import SearchFormLayout from './SearchFormLayout';
import apiUrls from 'api-endpoints';

const getCurrentYear = () => {
  const time = new Date();
  return time.getFullYear();
};

const schema = (formid, values) => ({
  learning_type: {
    type: 'select',
    floatingLabelText: t1('learning_type'),
    floatingLabelFixed: true,
    options: 'async',
    defaultValue: courseLearningTypes.ILT,
    validate: [required()],
    fullWidth: true,
  },
  year: {
    type: 'select',
    floatingLabelText: t1('choose_year'),
    floatingLabelFixed: true,
    options: year(),
    fullWidth: true,
    defaultValue: getCurrentYear(),
    validate: [required()],
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['learning_type', 'year'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
