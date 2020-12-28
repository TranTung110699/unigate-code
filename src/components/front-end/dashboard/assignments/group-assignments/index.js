import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import Results from './Results';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    return (
      <SearchWrapper
        formid="get_all_assignments"
        renderResultsComponent={this.renderResultComponent}
        autoSearchWhenStart
        hidePagination
      />
    );
  }
}

export default Layout;
