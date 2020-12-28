import React from 'react';
import FormFilter from './FormFilter';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import CourseFeedbackResult from './CourseFeedbackResults';
import Results from './Results';

const searchForm = ({ node, type }) => {
  const renderResultComponent = (items, form, count, page) => {
    if (node && node.ntype === 'course') {
      return <CourseFeedbackResult items={items} page={page} />;
    }
    return <Results items={items} page={page} type={type} />;
  };

  const hiddenFields = {
    type,
    object_iid: node && node.iid,
  };

  return (
    <SearchWrapper
      key={`${type}-feedback_search${(node && node.iid) || ''}`}
      formid="feedback_search"
      hiddenFields={hiddenFields}
      renderResultsComponent={renderResultComponent}
    >
      <FormFilter />
    </SearchWrapper>
  );
};

export default searchForm;
