import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import Results from 'components/admin/path/search/Results';
import { connect } from 'react-redux';
import FormFilters from './FormFilters';

class Layout extends Component {
  renderResultComponent = (items) => {
    const { node } = this.props;
    return (
      <Results
        items={items}
        {...this.props}
        ntype="path"
        type="unlock"
        userIid={node && node.iid}
      />
    );
  };

  render() {
    const { node } = this.props;
    const hiddenFields = {
      ntype: 'path',
      user_iid: node.iid,
    };
    return (
      <SearchWrapper
        formid="path_search"
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        showSearchButton
      >
        <FormFilters />
      </SearchWrapper>
    );
  }
}

export default connect()(Layout);
