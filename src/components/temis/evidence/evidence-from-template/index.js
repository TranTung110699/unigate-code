import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'components/temis/endpoints';
import Results from './Results';

const TemisEvidenceFromTemplate = ({
  formid = 'temis_evidence_from_template',
}) => {
  const renderResultComponent = React.useCallback(
    (items, props) => {
      return <Results items={items} searchFormId={formid} {...props} />;
    },
    [formid],
  );

  return (
    <SearchWrapper
      formid={formid}
      renderResultsComponent={renderResultComponent}
      alternativeApi={apiUrls.assessment_evidence_from_template_search}
      destroyOnUnmount
      showSearchButton={false}
    />
  );
};

export default TemisEvidenceFromTemplate;
