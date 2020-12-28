import { t1 } from 'translate';
import { UiLibs, year } from 'configs/constants';
import { required } from 'common/validators';
import SearchFormLayout from './SearchFormLayout';
import { enrolmentPlanStatusOptions } from '../../../../configs/constants/enrolmentPlan';
import { defaultStatusesForReportProgressMaster } from '../../enrolment-plan/search/common';

const getCurrentYear = () => {
  const time = new Date();
  return time.getFullYear();
};

const schema = () => ({
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
    options: year(false, getCurrentYear() - 2).reverse(),
    fullWidth: true,
    defaultValue: getCurrentYear(),
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
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
    fields: ['learning_type', 'year', 'enrolment_plan_status'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
