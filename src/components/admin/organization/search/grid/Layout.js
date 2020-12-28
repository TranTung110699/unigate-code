/* eslint-disable quotes,import/first,react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema/index';
import organizationApiUrls from 'components/admin/organization/endpoints';
import Results from './Results';
import { getOrgTypes, schoolTypes } from 'configs/constants';
import get from 'lodash.get';
import { getThemeConfig } from 'utils/selectors';

class OrganizationSearchGridLayout extends Component {
  renderResultComponent = (items, props) => {
    const { renderResultActions } = this.props;
    return (
      <Results
        items={items}
        {...props}
        renderResultActions={renderResultActions}
      />
    );
  };

  prepareDataBeforeSearch = (values) => {
    // if user did not select any pIids in form, we will use rootIids as default value
    return Object.assign({}, values, {
      pIids:
        Array.isArray(values.pIids) && values.pIids.length > 0
          ? values.pIids
          : values.rootIids,
    });
  };

  render() {
    const formid = this.props.formid || 'organization_search';
    const {
      parent,
      getOrgOnly,
      includeRoot,
      getOnlyOrganizationWhereUserHasPermission,
      orgTypes,
      isSIS,
    } = this.props;

    let hiddenFields = {
      depth: 1,
      _sand_expand: ['ancestor_iids'],
      getOnlyOrganizationWhereUserHasPermission,
      includeRoot,
      orgTypes,
    };

    if (!isSIS) {
      hiddenFields.view = 'grid';
      hiddenFields.depth = -1;
    }

    let params;
    if (getOrgOnly) {
      params = {
        get_organization_only: 1,
      };
      hiddenFields = {
        ...hiddenFields,
        ...params,
      };
    }

    let { rootIids } = this.props;
    if (parent) {
      rootIids = (rootIids || []).concat([parent.iid]);
    }

    if (Array.isArray(rootIids) && rootIids.length > 0) {
      hiddenFields = {
        ...hiddenFields,
        rootIids,
      };
    }

    return (
      <SearchWrapper
        formid={formid}
        schema={schema}
        hiddenFields={hiddenFields}
        params={params}
        renderResultsComponent={this.renderResultComponent}
        prepareDataBeforeSearch={this.prepareDataBeforeSearch}
        showSearchButton={false}
        alternativeApi={organizationApiUrls.organization_search}
        destroyOnUnmount
        searchResultKey={`${formid}_grid`}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  orgTypes: getOrgTypes(state, '*'),
  isSIS: get(getThemeConfig(state), 'type') === schoolTypes.SIS,
});

export default connect(mapStateToProps)(OrganizationSearchGridLayout);
