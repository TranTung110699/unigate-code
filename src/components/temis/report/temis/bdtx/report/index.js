import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'components/temis/endpoints';
import schema from './schema';
import Results from './Results';

const Report = () => {
  const renderResultsComponent = React.useCallback((items) => {
    return <Results items={items} />;
  }, []);

  return (
    <div>
      <SearchWrapper
        formid={'btdx_report'}
        alternativeApi={apiUrls.get_bdtx_report}
        schema={schema}
        renderResultsComponent={renderResultsComponent}
      />
    </div>
  );
};

export default Report;
