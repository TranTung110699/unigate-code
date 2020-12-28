import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import Results from './Results';
import apiUrls from '../endpoints';

function SearchSalePackage() {
  const renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  return (
    <div>
      <SearchWrapper
        schema={schema}
        showSearchButton={false}
        formid="sales_package_search"
        showQueryField
        renderResultsComponent={renderResultComponent}
        showResult
        alternativeApi={apiUrls.searchPackage}
      />
    </div>
  );
}

export default SearchSalePackage;
