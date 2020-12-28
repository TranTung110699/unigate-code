import React from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from 'api-endpoints';
import Results from './Results';

const renderResultComponent = (items, props) => (
  <Results items={items} {...props} />
);

const Layout = () => {
  return (
    <SearchWrapper
      formid="get_personal_assignments"
      renderResultsComponent={renderResultComponent}
      alternativeApi={apiUrls.get_personal_assignments}
      autoSearchWhenStart
      paginationProps={{
        showExtraControl: false,
        theme: 'light',
      }}
    />
  );
};

export default Layout;
