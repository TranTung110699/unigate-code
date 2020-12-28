import { t1 } from 'translate';
import { required } from 'common/validators';
import { customMonth, year } from 'configs/constants';
import SearchFormLayout from './SearchFormLayout';
import { enrolmentPlanStatusOptions } from 'configs/constants/enrolmentPlan';
import { defaultStatusesForReportProgressMaster } from 'components/admin/enrolment-plan/search/common';

const getCurrentYear = () => {
  const time = new Date();
  return time.getFullYear();
};

const schema = (formid, values) => ({
  learning_type: {
    type: 'select',
    floatingLabelText: t1('learning_type'),
    floatingLabelFixed: true,
    options: [
      {
        value: 'ilt',
        label: t1('ilt'),
      },
      {
        value: 'online',
        label: t1('online'),
      },
    ],
    defaultValue: 'ilt',
    fullWidth: true,
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
  forMonthMultiple: {
    type: 'select',
    fullWidth: true,
    floatingLabelText: t1('select_months'),
    options: customMonth(values && values.year),
    // errorText: t1("value_is_required_and_can't_be_empty"),
    multiple: true,
    // validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  enrolment_plan_status: {
    fullWidth: true,
    type: 'multiCheckbox',
    inline: true,
    floatingLabelText: t1('status_of_enrolment_plan'),
    hintText: t1('status_of_enrolment_plan'),
    options: enrolmentPlanStatusOptions(true),
    defaultValue: defaultStatusesForReportProgressMaster,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      'learning_type',
      'year',
      'forMonthMultiple',
      'enrolment_plan_status',
    ],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
