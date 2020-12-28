import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import organizationApiUrls from 'components/admin/organization/endpoints';
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
      readOnly={this.props.readOnly}
    />
  );

  render() {
    const formid = this.props.formid || 'organization_search';
    let { hiddenFields } = this.props;

    hiddenFields = Object.assign({}, hiddenFields, {
      view: 'tree',
      type: 'organization',
      pid: this.getPid(),
      depth: -1,
    });

    return (
      <SearchWrapper
        formid={formid}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderTreeResultComponent}
        alternativeApi={organizationApiUrls.get_user_organization_tree}
        destroyOnUnmount
        searchResultKey={`${formid}_tree`}
      />
    );
  }
}

export default Layout;
