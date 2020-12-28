import React from 'react';
import organizationApiUrls from 'components/admin/organization/endpoints';
import fetchData from 'components/common/fetchData';

const OrganizationTextInElementRecapMode = ({ organization }) => {
  if (!organization) {
    return null;
  }
  const { name } = organization;
  return name;
};

export default fetchData((props) => {
  const iid = props.value;

  return {
    baseUrl: organizationApiUrls.get_organization_info,
    params: {
      iid,
      fields: ['name', 'iid', 'type', 'sub_type'],
      _sand_expand: ['ancestor_iids'],
    },
    propKey: 'organization',
    keyState: `organizations_selection_${iid}`,
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  };
})(OrganizationTextInElementRecapMode);
