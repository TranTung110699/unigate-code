import { t1 } from 'translate';
import { required, validationWithCondition } from 'common/validators';
import { year } from 'configs/constants';
import SearchFormLayout from './SearchFormLayout';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { enrolmentPlanStatusOptions } from 'configs/constants/enrolmentPlan';
import { defaultStatusesForReportProgressMaster } from 'components/admin/enrolment-plan/search/common';
import { courseLearningTypes } from 'configs/constants';

const getCurrentYear = () => {
  const time = new Date();
  return time.getFullYear();
};

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  learning_type: {
    type: 'select',
    floatingLabelText: t1('learning_type'),
    floatingLabelFixed: true,
    options: [
      {
        value: courseLearningTypes.ILT,
        label: t1('ilt'),
      },
      {
        value: courseLearningTypes.ONLINE,
        label: t1('online'),
      },
    ],
    defaultValue: courseLearningTypes.ILT,
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
  organizations: organizations({
    formid,
    label: `${t1('content_organizations')} (*)`,
    defaultValue: props.orgIids,
    validate: [validationWithCondition(required(), values.requireOrganization)],
  }),
  include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
    defaultValue: Array.isArray(props.orgIids) && props.orgIids.length ? 1 : 0,
  }),
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
      'organizations',
      'include_sub_organizations',
      'enrolment_plan_status',
    ],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
