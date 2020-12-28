import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import advanceSchema from './schema-advance';
import apiUrls from 'components/temis/endpoints';
import Results from './Results';

const Layout = ({ formid = 'assessment_evidence_template_search' }) => {
  const renderResultComponent = React.useCallback(
    (items, props) => {
      return <Results items={items} searchFormId={formid} {...props} />;
    },
    [formid],
  );

  return (
    <SearchWrapper
      formid={formid}
      schema={advanceSchema}
      renderResultsComponent={renderResultComponent}
      alternativeApi={apiUrls.assessment_evidence_template_search}
      destroyOnUnmount
      showSearchButton={false}
    />
  );
};

export default Layout;
