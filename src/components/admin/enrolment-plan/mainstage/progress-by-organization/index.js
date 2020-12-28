import React from 'react';
import OrganizationProgressSearch from 'components/admin/report-teacher/organization-progress/search';
import lodashGet from 'lodash.get';

const ProgressByOrganization = ({ node }) => {
  const iid = lodashGet(node, 'iid');

  return (
    <OrganizationProgressSearch
      className="white-box"
      enrolmentPlanIids={iid && [iid]}
      noSearchForm
    />
  );
};

export default ProgressByOrganization;
