import React, { Component } from 'react';
import Results from './Results';
import schema from '../schema';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    return (
      <SearchWrapper
        {...this.props}
        formid="comment_search_by_global_survey"
        schema={schema}
        paginationProps={{
          onlyShowIfTotalBigEnough: false,
        }}
        renderResultsComponent={this.renderResultComponent}
      />
    );
  }
}

export default SearchForm;
