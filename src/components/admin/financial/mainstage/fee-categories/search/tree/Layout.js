import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from 'api-endpoints';
import TreeResults from './TreeResults';

class Layout extends Component {
  getPid = () => {
    const { parent } = this.props;
    return (parent && parent.id) || '0';
  };

  renderTreeResultComponent = (
    items,
    props,
    objects,
    searchValues,
    resultId,
  ) => (
    <TreeResults
      {...props}
      resultId={resultId}
      items={items}
      pid={this.getPid()}
    />
  );

  render() {
    const formid = this.props.formid || 'fee_category_search';
    let { hiddenFields } = this.props;

    hiddenFields = Object.assign({}, hiddenFields, {
      view: 'tree',
      type: 'fee',
      pid: this.getPid(),
      depth: -1,
    });

    return (
      <SearchWrapper
        formid={formid}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderTreeResultComponent}
        alternativeApi={apiUrls.fee_category_search}
        destroyOnUnmount
        searchResultKey={`${formid}_tree`}
      />
    );
  }
}

export default Layout;
