import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from 'api-endpoints';
import TreeResults from './TreeResults';

class AcademicCategorySearchTreeLayout extends Component {
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
    const formid = this.props.formid || 'academic_category_search';
    let { hiddenFields } = this.props;

    hiddenFields = Object.assign({}, hiddenFields, {
      view: 'tree',
      pid: this.getPid(),
      depth: -1,
    });

    return (
      <SearchWrapper
        noAutoFocus={this.props.noAutoFocus}
        formid={formid}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderTreeResultComponent}
        alternativeApi={apiUrls.academic_category_search}
        destroyOnUnmount
        searchResultKey={`${formid}_tree`}
      />
    );
  }
}

export default AcademicCategorySearchTreeLayout;
