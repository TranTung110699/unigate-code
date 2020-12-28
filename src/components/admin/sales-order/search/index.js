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
        formid="sales_order_search"
        showQueryField
        renderResultsComponent={renderResultComponent}
        showResult
        alternativeApi={apiUrls.searchOrder}
        showSearchButton={false}
      />
    </div>
  );
}

export default SearchSalePackage;
