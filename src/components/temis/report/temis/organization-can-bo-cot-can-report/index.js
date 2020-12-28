import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import Results from './Results';
import temisApiUrls from 'components/temis/endpoints';

const renderResultsComponent = (result) => {
  return <Results result={result} />;
};

const OrganizationCanBoCotCanReport = () => {
  return (
    <div className="whitebox">
      <h1>Báo cáo tình trạng cán bộ cốt cán của tổ chức</h1>
      <SearchWrapper
        formid={'temis-organization-can-bo-cot-can-report'}
        schema={schema}
        alternativeApi={temisApiUrls.organization_can_bo_cot_can_report}
        renderResultsComponent={renderResultsComponent}
        showResult
      />
    </div>
  );
};

export default OrganizationCanBoCotCanReport;
