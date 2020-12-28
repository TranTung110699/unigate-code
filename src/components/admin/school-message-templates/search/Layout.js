import React, { Component } from 'react';

import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';

import Results from './Results';
import schema from './schema';

class Layout extends Component {
  formid = 'school_message_templates_search';

  renderTreeResultComponent = (
    items,
    props,
    objects,
    searchValues,
    resultId,
  ) => (
    <Results
      formid={this.formid}
      resultId={resultId}
      items={items}
      searchValues={searchValues}
      dispatch={props.dispatch}
    />
  );

  render() {
    return (
      <SearchWrapper
        schema={schema}
        formid={this.formid}
        alternativeApi={apiUrls[this.formid]}
        hiddenFields={{}}
        renderResultsComponent={this.renderTreeResultComponent}
      />
    );
  }
}

export default Layout;
