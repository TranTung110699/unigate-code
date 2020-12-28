import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import Results from './Results';
import lodashGet from 'lodash.get';

class Search extends Component {
  renderResultsComponent = (items) => {
    return <Results formid={this.props.formid} items={items} />;
  };

  render() {
    const { node } = this.props;
    return (
      <SearchWrapper
        formid={this.props.formid}
        schema={schema}
        renderResultsComponent={this.renderResultsComponent}
        hiddenFields={{
          item_iid: lodashGet(node, 'iid'),
          _sand_expand: ['survey_iid'],
        }}
        alternativeApi={sApiUrls.survey_applied_items_search}
        destroyOnUnmount
      />
    );
  }
}

export default Search;
