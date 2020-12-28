import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from 'api-endpoints';
import FormFilters from './FormFilters';
import Results from './Results';

class Layout extends Component {
  formid = 'goal_search';

  renderTreeResultComponent = (
    items,
    props,
    objects,
    searchValues,
    resultId,
  ) => <Results formid={this.formid} resultId={resultId} items={items} />;

  render() {
    return (
      <SearchWrapper
        formid={this.formid}
        renderResultsComponent={this.renderTreeResultComponent}
        alternativeApi={apiUrls.goal_search}
        destroyOnUnmount
      >
        <FormFilters />
      </SearchWrapper>
    );
  }
}

export default Layout;
