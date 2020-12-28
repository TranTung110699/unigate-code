import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import Results from './Results';

const renderResultsComponent = (items, { type, tcnn }) => {
  return <Results dataResult={items} type={type} tcnn={tcnn} />;
};

const TCNNReportSearch = ({ tcnn, type, userRoot }) => {
  return (
    <SearchWrapper
      formid={`temis-report-${tcnn}-${type}`}
      tcnn={tcnn}
      schema={schema}
      hiddenFields={{
        tcnn,
        type,
      }}
      alternativeApi="/assessment/api/get-data-tcnn-report"
      renderResultsComponent={renderResultsComponent}
      showResult
    />
  );
};

export default TCNNReportSearch;
