import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import withTemisConfig from 'common/hoc/withTemisConfig';
import endPoints from '../../endpoints';
import UserResults from './Results';
import schemaSearch from './schema-form';

const searchFormId = 'assess_assessment';
const defaultRenderResultsComponent = (items, { userRoot }) => {
  return <UserResults items={items} searchFormId={searchFormId} />;
};

const AssessInOrganization = ({ userRoot }) => {
  return (
    <SearchWrapper
      userRoot={userRoot}
      hiddenFields={{ nin_iid: [userRoot.iid] }}
      formid={searchFormId}
      renderResultsComponent={defaultRenderResultsComponent}
      schema={schemaSearch}
      showResult={true}
      alternativeApi={endPoints.listUserMustToApproveAssessment}
      autoSearchWhenStart
      paginationProps={{
        theme: 'light',
      }}
    />
  );
};

export default withTemisConfig(AssessInOrganization);
