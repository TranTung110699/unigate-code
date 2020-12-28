import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import Results from './Results';

const renderResultsComponent = (items, { type, tcnn }) => {
  return <Results dataResult={items} />;
};

const GVCCReportSearch = ({ formid, hiddenFields }) => {
  return (
    <SearchWrapper
      formid={formid}
      schema={schema}
      hiddenFields={hiddenFields}
      alternativeApi="/training-plan/data/data-to-report-gvcc"
      renderResultsComponent={renderResultsComponent}
      showResult
    />
  );
};

export default GVCCReportSearch;
