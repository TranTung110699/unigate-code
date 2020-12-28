import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema.js';
import Results from './Results';
import apiUrls from '../../endpoints';

function Buyer({ node = {} }) {
  const renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  return (
    <div>
      <SearchWrapper
        schema={schema}
        showSearchButton={false}
        formid="sales_package_buyer"
        showQueryField
        renderResultsComponent={renderResultComponent}
        showResult
        alternativeApi={apiUrls.listBuyer}
        hiddenFields={{
          iid: node.iid,
        }}
      />
    </div>
  );
}

export default Buyer;
