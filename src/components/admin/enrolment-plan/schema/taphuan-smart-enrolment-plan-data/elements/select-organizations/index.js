import React from 'react';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import fetchData from 'components/common/fetchData';
import { taphuanSmartEnrolmentPlanApi } from 'components/admin/enrolment-plan/endpoints';
import DisplayTable from './DisplayTable';
import lodashGet from 'lodash.get';
import {
  getGroupOfOrganization,
  isOrganizationSelected,
  setGroupOfOrganization,
  setIsOrganizationSelected,
} from './utils';

const TaphuanSmartEnrolmentPlanData = ({
  organizationsNeedToLearnData,
  onChange,
  value,
}) => {
  const {
    organizations_to_arrange: organizationsToArrange,
    number_of_not_assigned_users_by_organization: numberOfNotAssignedUsersByOrganization,
  } = organizationsNeedToLearnData || {};

  // set default value
  React.useEffect(
    () => {
      if (organizationsToArrange) {
        onChange(
          organizationsToArrange.reduce((v, org) => {
            return {
              ...v,
              [lodashGet(org, 'iid')]: {
                group: 1,
              },
            };
          }, {}),
        );
      }
    },
    [organizationsToArrange, onChange],
  );

  return (
    <DisplayTable
      organizations={organizationsToArrange}
      numberOfNotAssignedUsersByOrganization={
        numberOfNotAssignedUsersByOrganization
      }
      getGroupOfOrganization={getGroupOfOrganization(value)}
      setGroupOfOrganization={setGroupOfOrganization(value, onChange)}
      isOrganizationSelected={isOrganizationSelected(value)}
      setIsOrganizationSelected={setIsOrganizationSelected(value, onChange)}
    />
  );
};

const fetchOrganizationData = fetchData((props) => {
  const organizationIids = props.organizationIids;
  const enrolmentPlanTemplateIid = props.enrolmentPlanTemplateIid;

  return {
    baseUrl:
      taphuanSmartEnrolmentPlanApi.get_organization_data_to_create_taphuan_smart_enrolment_plan,
    params: {
      enrolment_plan_organization_iids: organizationIids,
      enrolment_plan_template_iid: enrolmentPlanTemplateIid,
    },
    fetchCondition: [organizationIids, enrolmentPlanTemplateIid].every(Boolean), // all params are there
    propKey: 'organizationsNeedToLearnData',
  };
});

export default makeReduxFormCompatible({})(
  fetchOrganizationData(TaphuanSmartEnrolmentPlanData),
);
