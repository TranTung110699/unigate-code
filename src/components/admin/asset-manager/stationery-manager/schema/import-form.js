import { t1 } from 'translate';
import ImportFormFreeStyle from '../freestyle/ImportFormFreeStyle';
import stationeryList from './stationery-list';
import { required } from 'common/validators';
import DatePicker from 'schema-form/elements/date-picker';

const schema = (formid, values, step) => ({
  date: {
    floatingLabelText: t1('date'),
    hintText: t1('enter_date'),
    type: DatePicker,
    getEndDate: true,
    fullWidth: true,
    validate: required(t1('date_is_required')),
  },
  description: {
    type: 'text',
    hintText: t1('enter_description'),
    floatingLabelText: t1('description'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    multiLine: true,
    validate: required(t1('description_is_required')),
  },
  stationery_list: {
    type: 'array',
    schema: stationeryList,
    hiddenAddButton: true,
    hiddenRemoveButton: true,
  },
  hidden_type: {
    type: 'hidden',
    defaultValue: values.step,
  },
});
const ui = () => {
  return [
    {
      id: 'default',
      fields: ['date', 'description', 'stationery_list', 'hidden_type'],
    },
  ];
};

export default {
  schema,
  ui,
  layout: {
    component: ImportFormFreeStyle,
    freestyle: 1,
  },
};
