import React from 'react';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import fetchData from 'components/common/fetchData';
import { taphuanSmartEnrolmentPlanApi } from 'components/admin/enrolment-plan/endpoints';
import DisplayTable from './DisplayTable';
import { nonDestructiveSort } from 'common/utils/Array';
import { getSelectedOrganizationIids } from 'components/admin/enrolment-plan/schema/taphuan-smart-enrolment-plan-data/elements/select-organizations/utils';
import {
  isCreditSyllabusSelected,
  setIsCreditSyllabusSelected,
} from 'components/admin/enrolment-plan/schema/taphuan-smart-enrolment-plan-data/elements/arrange-by-credit-syllabuses/utils';
import lodashGet from 'lodash.get';

const ArrangeByCreditSyllabuses = ({
  creditSyllabusesData,
  organizationSelection,
  enrolmentPlanTemplateIid,
  suggestedNumberOfUsersPerCourse,
  value,
  onChange,
}) => {
  const {
    credit_syllabuses: creditSyllabuses,
    total_not_assigned_users: totalNotAssignedUsers,
    number_of_not_assigned_users_by_credit_syllabus: numberOfNotAssignedUsersByCreditSyllabus,
    total_teachers: totalTeachers,
    number_of_teachers_by_credit_syllabus: numberOfTeachersByCreditSyllabus,
  } = creditSyllabusesData || {};

  // set default value
  React.useEffect(
    () => {
      if (creditSyllabuses) {
        onChange(
          creditSyllabuses.reduce((v, cs) => {
            return {
              ...v,
              [lodashGet(cs, 'iid')]: {
                selected: 1,
              },
            };
          }, {}),
        );
      }
    },
    [creditSyllabuses, onChange],
  );

  return (
    <DisplayTable
      organizationSelection={organizationSelection}
      enrolmentPlanTemplateIid={enrolmentPlanTemplateIid}
      suggestedNumberOfUsersPerCourse={suggestedNumberOfUsersPerCourse}
      creditSyllabuses={creditSyllabuses}
      totalNotAssignedUsers={totalNotAssignedUsers}
      numberOfNotAssignedUsersByCreditSyllabus={
        numberOfNotAssignedUsersByCreditSyllabus
      }
      totalTeachers={totalTeachers}
      numberOfTeachersByCreditSyllabus={numberOfTeachersByCreditSyllabus}
      isCreditSyllabusSelected={isCreditSyllabusSelected(value)}
      setIsCreditSyllabusSelected={setIsCreditSyllabusSelected(value, onChange)}
    />
  );
};

const fetchCreditSyllabusesData = fetchData((props) => {
  let organizationIids = getSelectedOrganizationIids(
    props.organizationSelection,
  )();

  organizationIids = nonDestructiveSort(organizationIids); // sort to prevent refetch when params change
  const enrolmentPlanTemplateIid = props.enrolmentPlanTemplateIid;

  return {
    baseUrl:
      taphuanSmartEnrolmentPlanApi.get_credit_syllabuses_data_to_create_taphuan_smart_enrolment_plan,
    params: {
      organization_iids: organizationIids,
      enrolment_plan_template_iid: enrolmentPlanTemplateIid,
    },
    fetchCondition: enrolmentPlanTemplateIid,
    propKey: 'creditSyllabusesData',
  };
});

export default makeReduxFormCompatible({})(
  fetchCreditSyllabusesData(ArrangeByCreditSyllabuses),
);
