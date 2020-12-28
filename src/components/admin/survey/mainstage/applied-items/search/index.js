import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import Results from './Results';

class Search extends React.Component {
  renderResultComponent = (items, props) => (
    <Results {...props} items={items} survey={this.props.node} />
  );

  render() {
    const { node } = this.props;
    const formid = this.props.formid || 'survey_applied_items_search';
    const hiddenFields = {
      _sand_expand: ['item_iid'],
      survey_iid: node.iid,
    };

    return (
      <SearchWrapper
        survey={this.props.node}
        formid={formid}
        schema={schema}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={sApiUrls.survey_applied_items_search}
        destroyOnUnmount
      />
    );
  }
}

export default Search;
