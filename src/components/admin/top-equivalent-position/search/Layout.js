import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
// import apiUrls from 'api-endpoints';
import evnApiUrls from 'components/admin/top-equivalent-position/endpoints';
import schema from './schema';
import Results from './Results';

class Layout extends Component {
  formid = 'top_equivalent_position_search';

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
      dispatch={props.dispatch}
    />
  );

  render() {
    return (
      <SearchWrapper
        schema={schema}
        formid={this.formid}
        alternativeApi={evnApiUrls.evn_equivalent_positions}
        hiddenFields={{}}
        renderResultsComponent={this.renderTreeResultComponent}
      />
    );
  }
}

export default Layout;
