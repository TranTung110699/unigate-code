import React, { Component } from 'react';
import apiUrls from 'api-endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from 'components/admin/course/search/schema/sis-form';

import Results from './Results';

const formid = 'offline_exam_search';

const renderResultComponent = (items, props) => {
  return <Results items={items} {...props} />;
};

const searchLayout = ({ hiddenFields = {}, ...props } = {}) => {
  return (
    <SearchWrapper
      resetForm
      formid={formid}
      hiddenFields={Object.assign({}, hiddenFields, {
        ntype: 'course',
        _sand_step: 'offline_exam',
        exam_type: 'OFFLINE_EXAM',
      })}
      renderResultsComponent={renderResultComponent}
      schema={schema(hiddenFields)}
      showQueryField={false}
      showSearchButton
      ntype="course"
      alternativeApi={apiUrls.offline_exam_search}
      {...props}
    />
  );
};

export default searchLayout;
