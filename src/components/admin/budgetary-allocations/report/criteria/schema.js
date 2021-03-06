import { t1 } from 'translate';
import { required } from 'common/validators';
import { costType, customMonth, reportBy, year } from 'configs/constants';
import { change } from 'redux-form';
import Store from 'store';
const getCurrentYear = () => {
  const time = new Date();
  return time.getFullYear();
};
const getEndMonth = (values) => {
  // tim index start month
  const startMonth = customMonth(values && values.year);
  const index = startMonth.findIndex((el) => el.value === values.start_month);
  return startMonth.slice(index + 1);
};
const getDefaultEndMonth = (values) => {
  const endMonth = getEndMonth(values);
  const x = endMonth[0] && endMonth[0].value;
  return endMonth[1] && endMonth[1].value;
};

const handleChange = (formid, values, value) => {
  Store.dispatch(change(formid, value, ''));
};

const schema = (formid, values, step) => ({
  type: {
    type: 'select',
    floatingLabelText: t1('choose_information'),
    floatingLabelFixed: true,
    options: costType(),
    fullWidth: true,
    defaultValue: 'budgetary',
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
    onChange: (event, value) => handleChange(formid, values, value),
  },
  reportBy: {
    type: 'select',
    floatingLabelText: t1('report_by'),
    floatingLabelFixed: true,
    options: reportBy(),
    fullWidth: true,
    defaultValue: 'month',
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
    onChange: (event, value) => handleChange(formid, values, value),
  },
  year: {
    type: 'select',
    floatingLabelText: t1('choose_year'),
    floatingLabelFixed: true,
    options: year(),
    fullWidth: true,
    defaultValue: getCurrentYear(),
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  forMonth: {
    type: 'select',
    hintText: t1('month'),
    floatingLabelText: t1('month'),
    options: customMonth(values && values.year),
    // minDate: values && values.year ? new Date(values.year, 1, 1, 0, 0, 0) : null,
    // maxDate: values && values.year ? new Date(values.year, 12, 31, 23, 59, 0) : null,
    fullWidth: true,
    defaultValue: customMonth(values && values.year)[0].value,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  start_month: {
    type: 'select',
    hintText: t1('start_month'),
    floatingLabelText: t1('start_month'),
    options: customMonth(values && values.year),
    // minDate: values && values.year ? new Date(values.year, 1, 1, 0, 0, 0) : null,
    // maxDate: values && values.year ? new Date(values.year, 12, 31, 23, 59, 0) : null,
    fullWidth: true,
    defaultValue: customMonth(values && values.year)[0].value,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  end_month: {
    type: 'select',
    hintText: t1('end_month'),
    floatingLabelText: t1('end_month'),
    options:
      values && values.start_month
        ? getEndMonth(values)
        : customMonth(values && values.year),
    // min                                  Date: values && values.year ? new Date(values.year, 1, 1, 0, 0, 0) : null,
    // maxDate: values && values.year ? new Date(values.year, 12, 31, 23, 59, 0) : null,
    fullWidth: true,
    defaultValue: getDefaultEndMonth(values),
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
});
const monthOnce = ['forMonth'];
const period = ['start_month', 'end_month'];
const ui = (step, values) => {
  let fields = ['year', 'reportBy'];
  if (values.reportBy && values.reportBy === 'period') {
    fields = fields.concat(period);
  } else {
    fields = fields.concat(monthOnce);
  }
  return [
    {
      id: 'default',
      fields,
    },
  ];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
