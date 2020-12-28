import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'components/temis/endpoints';
import Results from './Results';
import New from './new';

const TemisTemplatelessEvidence = ({
  formid = 'temis_templateless_evidence',
}) => {
  const renderResultComponent = React.useCallback(
    (items, props) => {
      return <Results items={items} searchFormId={formid} {...props} />;
    },
    [formid],
  );

  return (
    <div>
      <SearchWrapper
        formid={formid}
        renderResultsComponent={renderResultComponent}
        alternativeApi={apiUrls.templateless_assessment_evidence_search}
        destroyOnUnmount
        showSearchButton={false}
      />
      <New searchFormId={formid} />
    </div>
  );
};

export default TemisTemplatelessEvidence;
