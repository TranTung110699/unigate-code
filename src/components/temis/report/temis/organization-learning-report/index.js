import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import Results from './Results';
import temisApiUrls from 'components/temis/endpoints';

const renderResultsComponent = (items) => {
  return <Results items={items} />;
};

const OrganizationLearningReport = () => {
  return (
    <div className="whitebox">
      <h1>Báo cáo tình trạng học tập của tổ chức</h1>
      <SearchWrapper
        formid={'temis-organization-learning-report'}
        schema={schema}
        alternativeApi={temisApiUrls.get_organization_learning_report}
        renderResultsComponent={renderResultsComponent}
      />
    </div>
  );
};

export default OrganizationLearningReport;
