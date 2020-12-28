import SelectOrganizations from './elements/select-organizations';
import ArrangeByCreditSyllabuses from './elements/arrange-by-credit-syllabuses';
import lodashGet from 'lodash.get';
import LayoutFreestyle from './LayoutFreestyle';
import { t1 } from 'translate';
import SuggestedNumberOfUsersPerCourse from './elements/suggested_number_of_users_per_course';

const getSchema = (organizationIids, enrolmentPlanTemplateIid) => (
  formid,
  values,
  step,
  xpath,
  props,
  domainInfo,
) => {
  return {
    select_organizations: {
      type: SelectOrganizations,
      organizationIids,
      enrolmentPlanTemplateIid,
    },
    credit_syllabuses: {
      type: ArrangeByCreditSyllabuses,
      organizationSelection: lodashGet(values, `${xpath}.select_organizations`),
      enrolmentPlanTemplateIid,
      suggestedNumberOfUsersPerCourse: lodashGet(
        values,
        `${xpath}.suggested_number_of_users_per_course`,
      ),
    },
    suggested_number_of_users_per_course: {
      type: SuggestedNumberOfUsersPerCourse,
      label: t1('suggested_number_of_users_per_course'),
      defaultValue: 50,
    },
  };
};

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  return [
    {
      id: 'default',
      fields: [
        'select_organizations',
        'credit_syllabuses',
        'suggested_number_of_users_per_course',
      ],
    },
  ];
};

export default (organizationIids, enrolmentPlanTemplateIid) => ({
  schema: getSchema(organizationIids, enrolmentPlanTemplateIid),
  ui,
  layout: {
    freestyle: 1,
    component: LayoutFreestyle,
  },
});
