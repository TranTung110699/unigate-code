import React, { Component } from 'react';
import apiUrls from 'api-endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { t1 } from 'translate';
import Results from 'components/admin/req/search/Results';

const formid = 'request_type_search';

class Layout extends Component {
  renderResultComponent = (items) => (
    <Results
      items={items}
      searchFormId={formid}
      hideFields={['request_type', 'fee']}
    />
  );

  render() {
    const hiddenFields = {
      request_type: 'leave_of_absence_by_date',
    };

    return (
      <SearchWrapper
        alternativeApi={apiUrls.processing_req_search}
        formid={formid}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        renderNoResultComponent={() => t1('no_request')}
        showSearchButton={false}
        autoSearchWhenHiddenFieldsChange
      />
    );
  }
}

export default Layout;
