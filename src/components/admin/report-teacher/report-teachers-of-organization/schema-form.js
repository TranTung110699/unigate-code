import { t1 } from 'translate';
import { required } from 'common/validators';
import { customMonth, year } from 'configs/constants';
import SearchFormLayout from './SearchFormLayout';

const getCurrentYear = () => {
  const time = new Date();
  return time.getFullYear();
};

const schema = (formid, values) => ({
  year: {
    type: 'select',
    floatingLabelText: t1('choose_year'),
    floatingLabelFixed: true,
    options: year(),
    fullWidth: true,
    defaultValue: getCurrentYear(),
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  months: {
    type: 'select',
    fullWidth: true,
    floatingLabelText: t1('select_months'),
    options: customMonth(values && values.year, true),
    // errorText: t1("value_is_required_and_can't_be_empty"),
    multiple: true,
    // validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['year', 'months'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
